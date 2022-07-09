const tileElements = document.getElementsByClassName("tile");
const buttonElement = document.getElementsByTagName("button");
const messageBoxElement = document.getElementById("message-box");

const gameBoard = (() => {
    let boardArray = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    const _winArray = [30, 1001, 7429, 506, 1495, 627, 238, 935];
    const _tileNumbering = [2, 3, 5, 7, 11, 13, 17, 19, 23];
    
    const alterBoard = (index, currentToken) => {
        boardArray[index] = currentToken;
        _updateBoardDisplay();
    };
    const _updateBoardDisplay = () => {
        for (let i=0; i<9; i++) {
            tileElements[i].textContent = boardArray[i]
        }
    };
    const resetBoard = () => {
        boardArray = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        for (let i=0; i<9; i++) {
            tileElements[i].replaceWith(tileElements[i].cloneNode(true));
        }
        for (let i=0; i<9; i++) {
            tileElements[i].addEventListener("click", function() {if (boardArray[i] === " ") {tileClick(i)}});
        }
        currentPlayer = playerOne;
        message = `${currentPlayer.name}'s turn.`;
        messageBoxElement.textContent = message;
        _updateBoardDisplay();
    };
    const checkWin = () => {
        let XScore = 1;
        let OScore = 1;
        for (let i=0; i<9; i++) {
            if (boardArray[i] === "X") {
                XScore *= _tileNumbering[i];
            } else if (boardArray[i] === "O") {
                OScore *= _tileNumbering[i];
            }
        }

        if (_winArray.includes(XScore)) {
            return "X";
        } else if (_winArray.includes(OScore)) {
            return "O";
        } else if (XScore*OScore == 223092870) {
            return "draw";
        } else {
            return "ongoing";
        }
    }

    return {
        boardArray,
        alterBoard,
        resetBoard,
        checkWin,
    };
})();

const playerFactory = (name, token) => {
    return {name, token};
}

const playerOne = playerFactory("Player One", "X");
const playerTwo = playerFactory("Player Two", "O");

let currentPlayer = playerOne;

let message = `${currentPlayer.name}'s turn.`;
messageBoxElement.textContent = message;

for (let i=0; i<9; i++) {
    tileElements[i].addEventListener("click", function() {if (gameBoard.boardArray[i] === " ") {tileClick(i)}});
}

buttonElement[0].addEventListener("click", gameBoard.resetBoard);

function tileClick (index) {
    gameBoard.alterBoard(index, currentPlayer.token);
    if (currentPlayer == playerOne) {
        currentPlayer = playerTwo;
    } else {
        currentPlayer = playerOne;
    }

    let winState = gameBoard.checkWin();
    if (winState === "X") {
        message = "Player One has won!";
        for (let i=0; i<9; i++) {
            tileElements[i].replaceWith(tileElements[i].cloneNode(true));
        }
    
    } else if (winState === "O") {
        message = "Player Two has won!";
        for (let i=0; i<9; i++) {
            tileElements[i].replaceWith(tileElements[i].cloneNode(true));
        }
    
    } else if (winState === "draw") {
        message = "It's a draw.";
    } else {
        message = `${currentPlayer.name}'s turn.`;
    }
    messageBoxElement.textContent = message;
}

