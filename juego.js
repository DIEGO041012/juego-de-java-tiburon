    const movableImage = document.getElementById("movableImage");
    const gameBoard = document.getElementById("game-board");
    let imageX = 0;
    let imageY = 0;
    const moveStep = 60; // Ajusta esto según el tamaño de las celdas en tu juego

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

        const collisionElements = document.querySelectorAll('.wall');

        let collision = false;
        const nextImageRect = movableImage.getBoundingClientRect();

        collisionElements.forEach((element) => {
            const elementRect = element.getBoundingClientRect();

            if (
                nextImageX + nextImageRect.width > elementRect.left &&
                nextImageX < elementRect.left + elementRect.width &&
                nextImageY + nextImageRect.height > elementRect.top &&
                nextImageY < elementRect.top + elementRect.height
            ) {
                collision = true;
            }
        });

        if (!collision) {
            imageX = nextImageX;
            imageY = nextImageY;
            movableImage.style.left = `${imageX}px`;
            movableImage.style.top = `${imageY}px`;
        }
    });





