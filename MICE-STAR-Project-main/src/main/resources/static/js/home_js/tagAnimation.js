document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tag-row').forEach(row => {
        const group = row.querySelector('.tag-group');
        const originalTagsHTML = group.innerHTML;

        // 화면 너비의 두 배가 될 때까지 태그 복제
        while (group.offsetWidth < window.innerWidth * 2) {
            group.innerHTML += originalTagsHTML;
        }
    });
});