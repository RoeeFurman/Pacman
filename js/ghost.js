'use strict'
// const GHOST = '&#9781;';
const GHOST = '<img src="img/ghost.png">';
var gGhosts;
var gIntervalGhosts;
var gDeaeGhosts = [];
// console.log('ghost')

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD, //add color to the ghost
        color: getRandomColor(),
    }
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
}

function createGhosts(board) {
    // 3 ghosts and an interval
    gGhosts = [];
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    // console.log(gGhosts);
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    // console.log('ghost.location', ghost.location)
    // figure out moveDiff, nextLocation, nextCell

    var moveDiff = getMoveDiff()
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell', nextCell)
    // return if cannot move
    if (nextCell === WALL ||nextCell === GHOST) return
    // if (nextCell === GHOST) return
    // hitting a pacman?  call gameOver
    if (nextCell === PACMAN) {
        // if (gPacman.isSuper) return;
        //     console.log('you can eat me now!');
        //     {
              //     }
        // }
        if (!gPacman.isSuper) gameOver(false);
        return
    }

    // moving from corrent position:
    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // Move the ghost to new location
    // update the model
    ghost.location = {
        i: nextLocation.i,
        j: nextLocation.j
    }
    ghost.currCellContent = nextCell
    gBoard[ghost.location.i][ghost.location.j] = GHOST
    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
    // renderMonsterColor(ghost.location,ghost.color);
}

function getGhostHTML(ghost) {
    if (gPacman.isSuper) return `<span style="color:orange"><img src="/img/ghost2.png"></span>`;
    return `<span style="color:${ghost.color}"><img src="/img/ghost.png"></span>`
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}



// gInterval = setInterval(() => { }, 3000)
