// 애니메이션을 적용할 모든 섹션을 선택
const animatedSections = document.querySelectorAll('.dev-container');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // entry.isIntersecting은 해당 요소가 화면에 보이는지 여부 (true/false)
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, {

    threshold: 0.3 // 요소가 10% 보였을 때 애니메이션 실행
});

// 각 섹션을 관찰 대상으로 등록
animatedSections.forEach(section => {
    observer.observe(section);
});