document.addEventListener('DOMContentLoaded', () => {
    // 1. 스크롤이 일어나는 컨테이너를 선택합니다.
    const scrollContainer = document.querySelector('.scroll-container');

    // 2. 애니메이션을 적용할 모든 요소를 선택합니다.
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // 3. Intersection Observer 생성
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('start-animation');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: scrollContainer, // ★★★ 이 부분이 핵심입니다!
        threshold: 0.1
    });

    // 4. 각 요소에 대한 관찰을 시작합니다.
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});