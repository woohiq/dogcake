document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.getElementById("gameContainer");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");

    const cols = 17, rows = 10;
    const appleSize = 50;
    let apples = [];
    let score = 0;
    let timeLeft = 120;
    let dragBox = null;
    let startX, startY, endX, endY;

    let timer = null; // 타이머를 전역에서 관리

    // 타이머 시작
    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft === 0) {
                clearInterval(timer);
                alert("게임 종료! 최종 점수: " + score);
            }
        }, 1000);
    }

    // 랜덤 숫자 생성 (1~9)
    function getRandomNumber() {
        return Math.floor(Math.random() * 9) + 1;
    }

    // 사과 생성
    function createApples() {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                let apple = document.createElement("div");
                apple.classList.add("apple");
                let num = getRandomNumber();
                apple.textContent = num;
                apple.dataset.value = num;
                apple.style.left = `${c * appleSize}px`;
                apple.style.top = `${r * appleSize}px`;
                apple.style.backgroundColor = `hsl(${num * 40}, 80%, 50%)`;
                gameContainer.appendChild(apple);
                apples.push(apple);
            }
        }
    }

    document.addEventListener("mousedown", (e) => {
        // ✅ 사이드바 내부는 제외
        if (e.target.closest('#sidebar')) return;
    
        startX = e.clientX;
        startY = e.clientY;
        dragBox = document.createElement("div");
        dragBox.classList.add("redBox");
        dragBox.style.left = `${startX}px`;
        dragBox.style.top = `${startY}px`;
        dragBox.style.position = "absolute";
        document.body.appendChild(dragBox);
    });
    
    document.addEventListener("mousemove", (e) => {
        if (!dragBox) return;
        endX = e.clientX;
        endY = e.clientY;
        dragBox.style.width = `${Math.abs(endX - startX)}px`;
        dragBox.style.height = `${Math.abs(endY - startY)}px`;
        dragBox.style.left = `${Math.min(startX, endX)}px`;
        dragBox.style.top = `${Math.min(startY, endY)}px`;
    });
    
    document.addEventListener("mouseup", () => {
        if (!dragBox) return;
        checkApplesInBox();
        document.body.removeChild(dragBox);
        dragBox = null;
    });
    
    // 박스 내의 사과 검사 (사과의 중심이 박스 내부에 있는 경우만 선택)
    function checkApplesInBox() {
        let selectedApples = [];
        let total = 0;

        // 게임 컨테이너의 오프셋 좌표 가져오기
        const containerRect = gameContainer.getBoundingClientRect();

        // 박스의 범위 계산
        let boxLeft = Math.min(startX, endX) - containerRect.left; // 컨테이너 기준으로 좌표 변환
        let boxRight = Math.max(startX, endX) - containerRect.left;
        let boxTop = Math.min(startY, endY) - containerRect.top;
        let boxBottom = Math.max(startY, endY) - containerRect.top;

        apples.forEach((apple) => {
            // 사과의 중심 좌표 계산 (게임 컨테이너 기준)
            let ax = parseInt(apple.style.left) + appleSize / 2;
            let ay = parseInt(apple.style.top) + appleSize / 2;

            // 사과의 중심이 드래그 박스 범위 내에 있는지 확인
            if (ax > boxLeft && ax < boxRight && ay > boxTop && ay < boxBottom) {
                total += parseInt(apple.dataset.value);
                selectedApples.push(apple);
            }
        });

        console.log("선택된 사과들: ", selectedApples.map(a => a.dataset.value)); // 디버깅 로그

        // 합이 10이면 사과 삭제 & 점수 증가
        if (total === 10) {
            selectedApples.forEach((apple) => {
                apple.style.opacity = "0"; // 서서히 사라지는 효과
                setTimeout(() => {
                    gameContainer.removeChild(apple);
                    apples = apples.filter((a) => a !== apple);
                    score++;
                    scoreDisplay.textContent = score;
                }, 300);
            });
        }
    }

    // 게임 초기화 함수
    function resetGame() {
        console.log("재시작 버튼이 눌렸습니다!"); // 디버깅 로그

        // 점수 초기화
        score = 0;
        scoreDisplay.textContent = score;

        // 시간 초기화
        timeLeft = 120;
        timerDisplay.textContent = timeLeft;

        // 사과 초기화
        apples.forEach(apple => gameContainer.removeChild(apple));
        apples = [];
        createApples();

        // 기존 타이머 종료 후 새 타이머 시작
        clearInterval(timer);
        startTimer();

    }

    // 재시작 버튼 생성 및 클릭 이벤트 추가
    const restartButton = document.createElement("button");
    restartButton.textContent = "재시작";
    restartButton.style.margin = "10px";
    restartButton.style.padding = "10px 20px";
    restartButton.style.fontSize = "16px";
    restartButton.style.cursor = "pointer";
    restartButton.addEventListener("click", (e) => {
        e.stopPropagation(); // 다른 이벤트로 전달되지 않도록 중단
        resetGame();
    });
    document.body.appendChild(restartButton);

    // 게임 시작
    createApples();
    startTimer();
});
