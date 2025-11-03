document.addEventListener("DOMContentLoaded", function() {
    const animatedTexts = document.querySelectorAll('.voice-text');
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.25
    });

    animatedTexts.forEach(text => {
        observer.observe(text);
    });
});