const sourcePanel = document.querySelector('.source-panel');
    const sourceImage = document.querySelector('.source-panel img');
    const magnifiedView = document.querySelector('.magnified-view');

    // 1. 이미지 위에 마우스가 들어왔을 때
    sourceImage.addEventListener('mouseenter', () => {
    magnifiedView.classList.add('visible');
});

    // 2. 이미지에서 마우스가 나갔을 때
    sourceImage.addEventListener('mouseleave', () => {
    magnifiedView.classList.remove('visible');
});

    // 3. 이미지 위에서 마우스가 움직일 때 (핵심 로직)
    sourceImage.addEventListener('mousemove', (e) => {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    // sourceImage의 전체 너비와 높이
    const sourceWidth = sourceImage.offsetWidth;
    const sourceHeight = sourceImage.offsetHeight;

    // 마우스 위치를 퍼센트(%)로 변환
    const percentX = (mouseX / sourceWidth) * 100;
    const percentY = (mouseY / sourceHeight) * 100;

    // 확대된 배경 이미지의 위치를 마우스 위치에 따라 변경
    magnifiedView.style.backgroundPosition = `${percentX}% ${percentY}%`;
});