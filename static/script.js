const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const emotionImage = document.getElementById('emotion-image');
const backendUrl = '/chat';

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage('user', message);
    userInput.value = '';

    try {
        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });

        if (!response.ok) {
            const errorData = await response.json();
            appendMessage('bot', `오류: ${errorData.error || '알 수 없는 오류'}`);
            updateEmotion('neutral');
            return;
        }

        const data = await response.json();
        const rawResponse = data.response;

        const sentiment = analyzeSentiment(rawResponse);
        updateEmotion(sentiment);

        const displayText = rawResponse.replace(/^.+?!!!\s*/, '');
        appendMessage('bot', displayText);

    } catch (error) {
        appendMessage('bot', `통신 오류: ${error.message}`);
        updateEmotion('neutral');
    }
}

function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(`${sender}-message`);
    messageDiv.textContent = `${sender}: ${text}`;
    chatLog.appendChild(messageDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
}

function analyzeSentiment(responseText) {
    responseText = responseText.toLowerCase();
    const match = responseText.match(/^(.+?)!!!/);
    if (match) {
        switch (match[1]) {
            case '기쁨': return 'happy';
            case '슬픔': return 'sad';
            case '분노': return 'angry';
            case '놀람': return 'surprised';
            case '중립': return 'neutral';
            default: return 'neutral';
        }
    }
    return 'happy';
}

function updateEmotion(emotion) {
    const valid = ['happy', 'sad', 'angry', 'surprised', 'neutral'];
    const safeEmotion = valid.includes(emotion) ? emotion : 'neutral';
    emotionImage.src = `/static/images/${safeEmotion}.png`;
}

window.onload = () => updateEmotion('happy');

const feedbackInput = document.getElementById('feedback-input');
const submitButton = document.getElementById('submit-feedback');

submitButton.addEventListener('click', async () => {
    const feedback = feedbackInput.value.trim();
    if (!feedback) {
        alert("피드백을 입력해주세요!");
        return;
    }

    try {
        const response = await fetch('/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ feedback: feedback })
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(`오류 발생: ${errorData.detail || "알 수 없는 오류"}`);
            return;
        }

        const data = await response.json();
        alert(`피드백이 저장되었습니다! ID: ${data.id}`);
        feedbackInput.value = '';

    } catch (error) {
        alert(`전송 실패: ${error.message}`);
    }
});
