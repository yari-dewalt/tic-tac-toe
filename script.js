// Objects
function Gameboard() {
    this.board = [];
}

function Player(marker) {
    var player = {
        marker : marker
    };

    return player;
}

const container = document.getElementById("game-container");
console.log(container)

gameboard = new Gameboard();
gameboard.board = ["X", "X", "X",
                   "O", "O", "O",
                   "X", "X", "X"]
console.log(gameboard.board);

player1 = Player("O");
console.log(player1.marker);

// Render Function
function Render(container, gameboard) {
    for (marker in gameboard.board) {
        let content = document.createElement("p");
        let text = document.createTextNode(gameboard.board[marker]);
        content.appendChild(text);
        container.appendChild(content);
    }
}

Render(container, gameboard);