const scrollContainer = document.querySelector('.scroll-container');

//애니메이션 적용 대상 선택
const typingSection = document.querySelector('#typing');
const typingTarget = typingSection.querySelector('.text-description');

// 2. 타이핑될 전체 텍스트를 저장하고, 화면에서는 일단 비웁니다.
const originalText = typingTarget.dataset.text;
typingTarget.textContent ='';

// 3. 타이핑 애니메이션을 실행 함수
function startTypingAnimation() {
    let charIndex = 0;

    if (window.typingInterval) {
        clearInterval(window.typingInterval);
    }

    window.typingInterval = setInterval(() => {
        if (charIndex < originalText.length) {
            typingTarget.textContent += originalText[charIndex];
            charIndex++;
        } else {
            clearInterval(window.typingInterval);
        }
    }, 50); // 0.1초 간격으로 타이핑
}

// 4. Intersection Observer 생성 및 설정
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startTypingAnimation();
            observer.unobserve(typingSection);
        }
    });
}, {
    root : scrollContainer,
    threshold: 0.1//노출도에 따른 애니메이션 재생 ex)10% 노출시 애니메이션 재생
});

// 5. #second-section 요소에 대한 관찰을 시작합니다.
observer.observe(typingSection);