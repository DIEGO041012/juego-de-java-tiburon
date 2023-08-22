document.addEventListener("DOMContentLoaded", () => {
    const movableImage = document.getElementById("movableImage");
    const arponImage = document.querySelector(".arpon");
    const wallElements = document.querySelectorAll(".wall");
    const buzosImages = document.querySelectorAll(".buzos");
    const gameBoard = document.getElementById("game-board");
    const hiddenArponImage = document.getElementById("hiddenArpon");

    let imageX = 0;
    let imageY = 0;
    const moveStep = 60; // Ajusta esto según el tamaño de las celdas en tu juego
    let timeRemaining = 60; // Duración del juego en segundos
    let buzosLeft = buzosImages.length;

    // Función para reiniciar la página
    function resetPage() {
        window.location.reload();
    }

    // Función para actualizar la cuenta regresiva
    function updateCountdown() {
        document.getElementById("countdown").textContent = `Tiempo restante: ${timeRemaining} segundos`;
    }

    // Movimiento del arpón cada 20 segundos
    setInterval(() => {
        moveArpon();
    }, 20000);

    // Actualizar la cuenta regresiva cada segundo
    const countdownInterval = setInterval(() => {
        timeRemaining--;
        updateCountdown();

        if (timeRemaining <= 0) {
            clearInterval(countdownInterval); // Detener la cuenta regresiva
            resetPage(); // Reiniciar la página cuando se agote el tiempo
        }
    }, 1000);

    // Eventos de teclado y colisiones
    document.addEventListener("keydown", (event) => {
        let nextImageX = imageX;
        let nextImageY = imageY;

        switch (event.key) {
            case "ArrowUp":
                nextImageY = Math.max(nextImageY - moveStep, 0);
                break;
            case "ArrowDown":
                nextImageY = Math.min(nextImageY + moveStep, gameBoard.clientHeight - movableImage.clientHeight);
                break;
            case "ArrowLeft":
                nextImageX = Math.max(nextImageX - moveStep, 0);
                break;
            case "ArrowRight":
                nextImageX = Math.min(nextImageX + moveStep, gameBoard.clientWidth - movableImage.clientWidth);
                break;
            default:
                return;
        }

        // Valida que la imagen no choque con las paredes
        if (!preventCollision(nextImageX, nextImageY)) {
            imageX = nextImageX;
            imageY = nextImageY;
            movableImage.style.left = `${imageX}px`;
            movableImage.style.top = `${imageY}px`;

            // Actualizar la posición de los buzos en función de la imagen movable
            buzosImages.forEach((buzosImage) => {
                const buzosRect = buzosImage.getBoundingClientRect();
                buzosImage.style.left = `${buzosRect.left + (nextImageX - imageX)}px`;
                buzosImage.style.top = `${buzosRect.top + (nextImageY - imageY)}px`;
            });
        }

        // Verificar colisiones con los buzos
        buzosImages.forEach((buzosImage) => {
            if (
                movableImage.getBoundingClientRect().left < buzosImage.getBoundingClientRect().right &&
                movableImage.getBoundingClientRect().right > buzosImage.getBoundingClientRect().left &&
                movableImage.getBoundingClientRect().top < buzosImage.getBoundingClientRect().bottom &&
                movableImage.getBoundingClientRect().bottom > buzosImage.getBoundingClientRect().top
            ) {
                buzosImage.style.display = "none";
                buzosLeft--;

                if (buzosLeft === 0) {
                    hiddenArponImage.style.display = "block";
                }
            }
        });

        // Verificar colisiones del arpón con la imagen movable
        const arponRect = arponImage.getBoundingClientRect();
        const movableRect = movableImage.getBoundingClientRect();

        if (
            arponRect.left < movableRect.right &&
            arponRect.right > movableRect.left &&
            arponRect.top < movableRect.bottom &&
            arponRect.bottom > movableRect.top
        ) {
            resetPage(); // Reiniciar la página si el arpón alcanza a la imagen movable
        }
    });

    // Función para evitar que la imagen choque con las paredes
    function preventCollision(nextImageX, nextImageY) {
        const movableImageRect = movableImage.getBoundingClientRect();
        let collisionDetected = false;

        wallElements.forEach((element) => {
            const elementRect = element.getBoundingClientRect();

            if (
                nextImageX + movableImageRect.width > elementRect.left &&
                nextImageX < elementRect.right &&
                nextImageY + movableImageRect.height > elementRect.top &&
                nextImageY < elementRect.bottom
            ) {
                collisionDetected = true;
            }
        });

        return collisionDetected;
    }

    // Función para mover el arpón hacia la imagen movable
    function moveArpon() {
        const arponRect = arponImage.getBoundingClientRect();
        const movableRect = movableImage.getBoundingClientRect();

        const targetX = movableRect.left + movableRect.width / 2 - arponRect.width / 2;
        const targetY = movableRect.top + movableRect.height / 2 - arponRect.height / 2;

        const speed = 4; // Ajusta la velocidad del arpón

        const deltaX = targetX - arponRect.left;
        const deltaY = targetY - arponRect.top;

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const velocityX = (deltaX / distance) * speed;
        const velocityY = (deltaY / distance) * speed;

        arponImage.style.left = `${arponRect.left + velocityX}px`;
        arponImage.style.top = `${arponRect.top + velocityY}px`;
    }
});
