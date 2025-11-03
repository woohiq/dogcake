document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll('.card');


    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // 카드가 10% 보이면 실행
    });

    cards.forEach(card => {
        observer.observe(card);
    });
});