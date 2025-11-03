// 토스트 메시지
const scrollPrompt = document.querySelector('.scroll-down-prompt-container');

// 2. 요소가 실제로 존재하는지 확인합니다.
if (scrollPrompt) {

    // 3. 메시지를 숨기고 이벤트 리스너를 제거하는 함수를 만듭니다.
    const hidePrompt = () => {
        // 타이머가 아직 실행되지 않았다면 취소합니다. (스크롤이 먼저 발생한 경우)
        clearTimeout(hideTimeout);

        // 메시지에 'hidden' 클래스를 추가하여 부드럽게 사라지게 합니다.
        scrollPrompt.classList.add('hidden');

        // 이 함수는 한 번만 실행되면 되므로, 연결된 이벤트 리스너를 모두 제거합니다.
        window.removeEventListener('wheel', hidePrompt);
        window.removeEventListener('touchstart', hidePrompt);
    };

    // 4. 3초 뒤에 자동으로 메시지를 숨기는 타이머를 설정합니다.
    let hideTimeout = setTimeout(hidePrompt, 3000); // 3초

    // 5. 사용자의 첫 스크롤(휠) 또는 터치를 감지하면 hidePrompt 함수를 실행합니다.
    window.addEventListener('wheel', hidePrompt);
    window.addEventListener('touchstart', hidePrompt);
}