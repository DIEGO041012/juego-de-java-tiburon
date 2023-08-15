// ... tu código existente ...

const gameBoard = document.getElementById('game-board');

function createMaze() {
    for (let row = 0; row < maze.length; row++) {
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');

        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === 1) {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell', 'wall');
                rowElement.appendChild(cellElement);
            }
        }

        gameBoard.appendChild(rowElement);
    }
}

createMaze();
