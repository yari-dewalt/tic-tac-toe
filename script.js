// Gameboard Object
function Gameboard() {
    this.board = ["", "", "",
                  "", "", "",
                  "", "", ""];
}

gameboard = new Gameboard();

// Variables
const container = document.getElementById("game-container");

let overhead = document.getElementById("overhead-text");
overhead.textContent = "X's turn"

const restartButton = document.getElementById("restart-button");
restartButton.addEventListener("click", () => {
    clearBoard(container, gameboard);
    overhead.textContent = "X's turn";

    Array.from(spaces).forEach(space => {
        space.addEventListener("click", (event) => {
            if (space.getAttribute("class") === "space filled") {
                return;
            }
            currentPlayer = playMove(currentPlayer, gameboard, space);
        })
    });
})

let gameRendered = false;
let currentPlayer = "X";

Render(container, gameboard); // Render initial board set up

let spaces = document.getElementsByClassName("space");

Array.from(spaces).forEach(space => {
    space.addEventListener("click", () => {
        if (space.getAttribute("class") === "space filled") {
            return;
        }
        currentPlayer = playMove(currentPlayer, gameboard, space);
    })
});

// Render Function
function Render(container, gameboard) {
    if (gameRendered === false) {
        for (i in gameboard.board) {
            let space = document.createElement("div");
            space.setAttribute("class", "space");
            space.setAttribute("id", i);
            let content = document.createElement("p");
            let text = document.createTextNode(gameboard.board[i]);
            content.appendChild(text);
            space.appendChild(content);
            container.appendChild(space);
            gameRendered = true;
        }
    }
    else {
        for (i in gameboard.board) {
            let space = document.getElementsByClassName("space")[i];
            space.firstChild.textContent = gameboard.board[i];
        }
    }
}

function stopPlay(spaces) {
    Array.from(spaces).forEach(space => {
        let newspace = space.cloneNode(true);
        space.parentNode.replaceChild(newspace, space);
    })
}

function playMove(currentPlayer, gameboard, space) {
    gameboard.board[space.getAttribute("id")] = currentPlayer;
    space.setAttribute("class", "space filled");

    Render(container, gameboard);
    if (checkWin(gameboard.board, currentPlayer)) {
        stopPlay(spaces);
        return currentPlayer;
    }

    if (checkTie(gameboard)) {
        return currentPlayer;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    overhead.textContent = `${currentPlayer}'s turn`;
    return currentPlayer;
}

function checkWin(board, player) {
    // Define all possible win conditions (rows, columns, diagonals)
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], //Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    // Check each win condition to see if the player has won
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] === player && board[b] === player && board[c] === player) {
            overhead.textContent = `${currentPlayer} has won!`;
            return true; // Player has won
        }
    }

    return false; // Player has not won
}

function checkTie(gameboard) {
    for (i in gameboard.board) {
        if (gameboard.board[i] === "") {
            return false;
        }
    }

    overhead.textContent = "It's a tie!";
    return true;
}

function clearBoard(container, gameboard) {
    for (i in gameboard.board) {
        gameboard.board[i] = "";
        Render(container, gameboard);
    }
    let spaces = document.getElementsByClassName("space filled");
    Array.from(spaces).forEach(space => {
        space.setAttribute("class", "space");
    })

    currentPlayer = "X";
    return currentPlayer;
}