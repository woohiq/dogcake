//페이지 진입 토스트 메시지
window.addEventListener('load', () => {
    const toast = document.getElementById('intro-toast');
    const countdownElement = document.getElementById('countdown');
    const panels = document.querySelectorAll('.left-panels img, .right-panels img');

    if (!toast || !countdownElement) return;

    let timeLeft = 10;
    let timer;

    toast.classList.add('show');

    timer = setInterval(() => {
        timeLeft--;
        countdownElement.textContent = timeLeft;

        if (timeLeft <= 0) hideToast();
    }, 1000);


    panels.forEach(panel => {
        panel.addEventListener('click', hideToast);
    });

    function hideToast() {
        if (!toast.classList.contains('show')) return;

        toast.classList.remove('show');
        clearInterval(timer);

        setTimeout(() => {
            toast.remove();
        }, 500);
    }
});



// 패널 클릭 토스트 이벤트
function showToast() {
    const toast = document.getElementById("toast");

    // 이미 표시 중이면 초기화
    if (toast.classList.contains("show")) {
        toast.classList.remove("show");
        void toast.offsetWidth; // reflow (애니메이션 리셋용)
    }

    toast.classList.add("show");

    // 2.5초 후 사라지게
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}