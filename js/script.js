let playerMove = 'X';
let gameOver = false;
let scoreX = 0;
let scoreO = 0;

if (localStorage.getItem("scoreX")) scoreX = parseInt(localStorage.getItem("scoreX"));
if (localStorage.getItem("scoreO")) scoreO = parseInt(localStorage.getItem("scoreO"));

document.querySelector('.scoreX').innerHTML = `<img class='w-[70px]' src='asset/x-icon.jpg'> <p>Wins: ${scoreX}</p>`;
document.querySelector('.scoreO').innerHTML = `<img class='w-[70px]' src='asset/o-icon.jpg'> <p>Wins: ${scoreO}</p>`;

let gridBox = [['', '', ''], ['', '', ''], ['', '', '']];

function move(row, col, event) {
    if (gameOver) {
        alert(`Game Over! ${playerMove} wins. Click 'Restart' to play again.`);
        return;
    }

    if (gridBox[row][col] === '') {
        gridBox[row][col] = playerMove;
        event.target.innerHTML = playerMove;

        if (winStatus(row, col)) {
            document.querySelector('.result').innerHTML = `${playerMove} Wins!`;

            if (playerMove === 'X') {
                scoreX++;
                document.querySelector('.scoreX').innerHTML =
                    `<img class='w-[70px]' src='asset/x-icon.jpg'> <p>Wins: ${scoreX}</p>`;
            } else {
                scoreO++;
                document.querySelector('.scoreO').innerHTML =
                    `<img class='w-[70px]' src='asset/o-icon.jpg'> <p>Wins: ${scoreO}</p>`;
            }

            localStorage.setItem("scoreX", scoreX);
            localStorage.setItem("scoreO", scoreO);
            gameOver = true;
        } else {
            playerMove = playerMove === 'X' ? 'O' : 'X';
            document.querySelector('.displayMove').innerHTML =
                `Turns: <img class='w-[70px]' src='asset/${playerMove}-icon.jpg'>`;
        }
    } else {
        alert('The selected box is filled!');
    }
}

function winStatus(row, col) {
    return (
        (gridBox[row][0] === playerMove && gridBox[row][1] === playerMove && gridBox[row][2] === playerMove) ||
        (gridBox[0][col] === playerMove && gridBox[1][col] === playerMove && gridBox[2][col] === playerMove) ||
        (gridBox[0][0] === playerMove && gridBox[1][1] === playerMove && gridBox[2][2] === playerMove) ||
        (gridBox[2][0] === playerMove && gridBox[1][1] === playerMove && gridBox[0][2] === playerMove)
    );
}

function restart() {
    gridBox = [['', '', ''], ['', '', ''], ['', '', '']];
    gameOver = false;
    playerMove = 'X';
    document.querySelector('.result').innerHTML = '';
    document.querySelector('.displayMove').innerHTML =
        `Turns: <img class='w-[70px]' src='asset/${playerMove}-icon.jpg'>`;
    document.querySelectorAll("td").forEach(box => box.innerHTML = '');
}

function reset() {
    scoreX = 0;
    scoreO = 0;
    localStorage.setItem("scoreX", scoreX);
    localStorage.setItem("scoreO", scoreO);
    restart();
}

document.querySelectorAll("td[data-pos]").forEach(cell => {
    cell.addEventListener("click", event => {
        const [row, col] = cell.dataset.pos.split("-").map(Number);
        move(row, col, event);
    });
});

document.getElementById("restartBtn").addEventListener("click", () => restart());
document.getElementById("resetBtn").addEventListener("click", () => reset());
