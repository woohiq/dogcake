// 1. 애니메이션을 적용할 텍스트 요소를 선택합니다.
const missionText = document.querySelector('.mission-description');

// 2. Intersection Observer를 생성합니다.
const missionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // 요소가 화면에 보이면
        if (entry.isIntersecting) {
            // 'fade-in' 클래스를 추가하여 애니메이션을 실행합니다.
            missionText.classList.add('fade-in');
            // 애니메이션은 한 번만 실행하면 되므로 관찰을 중지합니다.
            missionObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1 // 요소가 10% 보였을 때 실행
});

// 3. 텍스트 요소에 대한 관찰을 시작합니다.
missionObserver.observe(missionText);