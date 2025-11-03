const animatedElements = document.querySelectorAll('.animate-slide');

const hide = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            hide.unobserve(entry.target);
        }
    });
}, {
    // ★ 이 값을 0.4 또는 0.5로 수정해 보세요.
    threshold: 0.4
});

animatedElements.forEach(element => {
    hide.observe(element);
});