const source2Panel = document.querySelector('.source2-panel');
    const source2Image = document.querySelector('.source2-panel img');
    const magnified2View = document.querySelector('.magnified2-view');

// 1. 이미지 위에 마우스가 들어왔을 때
    source2Image.addEventListener('mouseenter', () => {
    magnified2View.classList.add('visible');
});

// 2. 이미지에서 마우스가 나갔을 때
source2Image.addEventListener('mouseleave', () => {
    magnified2View.classList.remove('visible');
});

// 3. 이미지 위에서 마우스가 움직일 때 (핵심 로직)
source2Image.addEventListener('mousemove', (e) => {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    // sourceImage의 전체 너비와 높이
    const sourceWidth = source2Image.offsetWidth;
    const sourceHeight = source2Image.offsetHeight;

    // 마우스 위치를 퍼센트(%)로 변환
    const percentX = (mouseX / sourceWidth) * 100;
    const percentY = (mouseY / sourceHeight) * 100;

    // 확대된 배경 이미지의 위치를 마우스 위치에 따라 변경
    magnified2View.style.backgroundPosition = `${percentX}% ${percentY}%`;
});