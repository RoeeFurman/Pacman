'use strict'
const WALL = ''
const FOOD = '<span style="font-size:12px;">🟡</span>'
const EMPTY = ' ';
const SUPERFOOD = '🍩';
const CHERRY = '<span style="font-size:28px;">🍒</span>';

var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
var gFoodCounter = 0;
var gIntervalCherry;

function init() {
    // console.log('Hello')
    var elModal = document.querySelector('.modal')
    if(elModal.style.display = 'block') elModal.style.display = 'none';
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    addRandomCherry()
    // console.table(gBoard)
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    gGame.score = 0;
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            // board[i][j] = FOOD;

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2) || (j===6 && i > 1 && i < 5)) {
                board[i][j] = WALL;
            }

            else if ((i === 1 && j === 1) || (i === 1 && j === 8) || (i === 8 && j === 8) || (i === 8 && j === 1)) {
                board[i][j] = SUPERFOOD;
                // gFoodCounter--;
            } else {
                board[i][j] = FOOD;
                gFoodCounter++; // counts all the food
            }
        }
    }
    gFoodCounter -= 1 // counts pacman
    console.log(gFoodCounter);
    return board;
}

function addRandomCherry() {
    gIntervalCherry = setInterval(() => {

        var emptyCells = makeEmptyCellsArr(gBoard);
        if (!emptyCells.length) return;
        var randCell = emptyCells[getRandomIntInclusive(0, emptyCells.length)];
        console.log(randCell, 'rand');
        console.log(emptyCells, 'emptycells');

        gBoard[randCell.i][randCell.j] = CHERRY;
        // = CHERRY;

        renderCell(randCell, CHERRY);

        // function renderCell(location, value) {
        //     // Select the elCell and set the value
        //     var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
        //     elCell.innerHTML = value;
        //   }

    }, 15000);

}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
}

function gameOver(isWon) {
    console.log(isWon);
    console.log('Game Over');
    clearInterval(gIntervalGhosts)
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)
    gFoodCounter = 0;
    gPacmanEatenCount = 0;
    clearInterval(gIntervalCherry);

    var elScore = document.querySelector('h2 span')
    elScore.innerText = '0';

    var str = '';
    (isWon) ? str = 'YOU WON!' : str = 'GAME OVER';
    console.log(str);
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'block';
    var elH1 = elModal.querySelector('h1');
    elH1.innerText = str;

    gGame.isOn = false;
}
