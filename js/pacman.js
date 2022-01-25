'use strict'
const PACMAN = '<img src="img/pacman.png">';

var gPacman;
var gPacmanEatenCount = 0;
var gIntervalSuper;

function createPacman(board) {
    gPacman = {
        location: {
            i: 5,
            j: 7
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev)
    // console.log('nextLocation', nextLocation)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell', nextCell)
    // return if cannot move

    if (nextCell === SUPERFOOD) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true;
        console.log('wow super food')
        console.log(gPacman.isSuper);

        setTimeout(() => {
            gPacman.isSuper = false;
            console.log(gPacman.isSuper);
            // console.log('no more super');
            for (var i = 0; i < gDeaeGhosts.length; i++) {
                var currGhost = gDeaeGhosts[i];
                currGhost.currCellContent = '';
                gGhosts.push(currGhost);
            }
            gDeaeGhosts = [];
        }, 5000)
    }

    if (nextCell === WALL) return

    // hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            for (var i = 0; i < gGhosts.length; i++) {
                var killedGhost = gGhosts[i];
                if (killedGhost.location.i === nextLocation.i && killedGhost.location.j === nextLocation.j) {
                    if (killedGhost.currCellContent === FOOD) {
                        gPacmanEatenCount++;
                        killedGhost.currCellContent === '';
                        updateScore(1)
                    }

                    // console.log(gPacmanEatenCount);
                    gDeaeGhosts.push(gGhosts.splice(i, 1)[0]);
                    // console.log(gGhosts, 'gGhost');
                    // console.log(gDeaeGhosts, 'gDeadGhost');
                    break
                }
            }
        }

        else {
            gameOver(false);
            return
        }
    }
    if (nextCell === FOOD) {
        updateScore(1)
        gPacmanEatenCount++;
        console.log(gPacmanEatenCount, 'food eaten by pack-man');
        if (gPacmanEatenCount === gFoodCounter) {
            // gIsWon = true;
            gameOver(true);
        }
    }

    if (nextCell === CHERRY) {
        updateScore(10)
    }

    // moving from corrent position:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // Move the pacman to new location
    // update the model
    gPacman.location = {
        i: nextLocation.i,
        j: nextLocation.j
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // update the DOM
   
    // renderCell(gPacman.location, PACMAN)
    renderCell(gPacman.location, ' <img src="/img/pacman.png">')
}

function getNextLocation(keyboardEvent) {
    // console.log('keyboardEvent.code', keyboardEvent.code)
    // figure out nextLocation
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (keyboardEvent.code) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        default: return null
    }
    return nextLocation;
}
