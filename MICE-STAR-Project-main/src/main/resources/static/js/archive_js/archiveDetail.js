document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.archive-frame-container');
    const currentImageEl = document.getElementById('currentArchiveImage');
    const currentImageNumEl = document.getElementById('currentImageNum');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const downloadBtn = document.getElementById('downloadButton');

    // 2. 데이터 가져오기 (이전과 동일)
    const archiveId = container.dataset.archiveId;
    const totalImages = parseInt(container.dataset.totalImages, 10);
    let currentImageIndex = 1;
    let imageUrls = [];


    // 3. 이미지 경로 배열 생성 (새로운 경로 규칙 적용)
    for (let i = 1; i <= totalImages; i++) {
        const imageUrl = `/images/archive/archive_${archiveId}/sub${archiveId}-${i}.png`;

        imageUrls.push(imageUrl);
    }

    // 4. 이미지 및 카운터 표시 함수 (이전과 동일)
    function showImage(index) {
        if (!imageUrls[index - 1]) return;
        currentImageEl.src = imageUrls[index - 1];
        currentImageEl.alt = `Archive ${archiveId} - Image ${index}`;
        currentImageNumEl.textContent = index;
    }

    // 5. 버튼 클릭 이벤트 (이전과 동일)
    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex > 1) ? currentImageIndex - 1 : totalImages;
        showImage(currentImageIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex < totalImages) ? currentImageIndex + 1 : 1;
        showImage(currentImageIndex);
    });

    downloadBtn.addEventListener('click', () => {
        const currentImageUrl = imageUrls[currentImageIndex - 1];

        // 다운로드 파일명도 규칙에 맞게 수정 (예: sub1-1.jpg)
        const filename = `sub${archiveId}-${currentImageIndex}.jpg`;

        const link = document.createElement('a');
        link.href = currentImageUrl;
        link.download = filename; // 수정한 파일명 적용
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    showImage(currentImageIndex);
});