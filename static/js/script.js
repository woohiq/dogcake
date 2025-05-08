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

// 최초 로딩 시 sessionStorage에서 불러오기
let chatHistory = JSON.parse(sessionStorage.getItem('chatHistory') || '[]');

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage('user', message);
    userInput.value = '';

    try {
        // 백엔드로 보낼 최근 히스토리 10개만 추출
        const payload = {
            message: message,
            history: chatHistory.slice(-10)
        };

        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        const rawResponse = data.response;

        // 히스토리에 추가하고 저장
        chatHistory.push({ user: message, bot: rawResponse });
        sessionStorage.setItem('chatHistory', JSON.stringify(chatHistory));

        const sentiment = analyzeSentiment(rawResponse);
        updateEmotion(sentiment);

        const displayText = rawResponse.replace(/^.+?!!!\s*/, '');
        appendMessage('bot', displayText);

    } catch (error) {
        appendMessage('bot', `통신 오류: ${error.message}`);
        updateEmotion('neutral');
    }
}

document.getElementById("reset-history").addEventListener("click", () => {
    if (confirm("정말 대화 기록을 초기화할까요?")) {
        chatHistory = [];
        sessionStorage.removeItem("chatHistory");
        chatLog.innerHTML = ''; // 화면상 메시지 제거
        updateEmotion('happy');
    }
});

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

document.addEventListener("DOMContentLoaded", () => {
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

    const feedbackInput = document.getElementById('feedback-input');
    const submitButton = document.getElementById('submit-feedback');
    const feedbackToggle = document.getElementById("feedback-toggle");
    const feedbackBox = document.getElementById("feedback-container");

    submitButton.addEventListener('click', async () => {
        const feedback = feedbackInput.value.trim();
        const spinner = document.getElementById("feedback-spinner");
    
        if (!feedback) {
            alert("피드백을 입력해주세요!");
            return;
        }
    
        // 전송 중 처리
        submitButton.disabled = true;
        spinner.style.display = 'inline-block';
    
        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ feedback: feedback })
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                alert(`오류 발생: ${data.detail || "알 수 없는 오류"}`);
            } else {
                alert(`피드백이 저장되었습니다! ID: ${data.id}`);
                feedbackInput.value = '';
            }
    
        } catch (error) {
            alert(`전송 실패: ${error.message}`);
        } finally {
            // 완료 후 원상복구
            submitButton.disabled = false;
            spinner.style.display = 'none';
        }
    });    

    feedbackToggle.addEventListener("click", () => {
        feedbackBox.classList.toggle("show");
    });

    updateEmotion('happy');
});
