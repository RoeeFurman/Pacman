


function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];

      var className = 'cell cell-' + i + '-' + j;
      if (cell === WALL) className += ' wall'
      strHTML += `<td id='${mat[i][j]}' class="${className}">${cell}</td>`
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  // console.log(strHTML);
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function renderMonsterColor(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.span.style.color = value;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function shuffle(items) {
  var randIdx, keep
  for (var i = items.length - 1; i > 0; i--) {
    randIdx = getRandomInt(0, items.length - 1);

    keep = items[i];
    items[i] = items[randIdx];
    items[randIdx] = keep;
  }
  return items;
}

function makeEmptyCellsArr(board) {
  var emptyCellsArr = [];

  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (isCellEmpty(i, j, board)) {
        emptyCellsArr.push({ i: i, j: j });
        // console.log(emptyCellsArr);
      }
    }
  }
  return emptyCellsArr;
}

function isCellEmpty(idxI, idxJ, board) {
  // console.log(board[idxI][idxJ].gameElement)
  if (board[idxI][idxJ] === ' ') return true;
  else return false;
}

