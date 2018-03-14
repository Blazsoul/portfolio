'use strict';
console.log('Start js');

var gState;
var gLevel;
var gBoard;

function levelChosen(size, mines) {
    console.log('start level', size);
    size = +size;
    mines = +mines;
    gLevel = { SIZE: size, MINES: mines };
    initGame();

}

function initGame() {
    gState = { isGameOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 };
    reset();
    gBoard = bulidBoard();
    console.table(gBoard);
    renderBoard(gBoard);
    // console.table(gBoard);

}

function reset() {
    changeToDiplay('.matchEnd', false);
    var elshowMarked = document.querySelector('.marked');
    elshowMarked.innerHTML = 'Flags:' + gState.markedCount;
    var elshownCount = document.querySelector('.showCount');
    elshownCount.innerHTML = 'Shown Count:' + gState.shownCount;
    var elTime = document.querySelector('.time');
    elTime.innerHTML = '';

}

function changeToDiplay(className, isDiplay) {
    var elClass = document.querySelector(className);
    elClass.style.display = (isDiplay) ? 'inline-block' : 'none';
}

function getNeighborsCount(board, rowIdx, colIdx) {
    var neigboursCount = 0;

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (!(i >= 0 && i < board.length)) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            // If middle cell or out of mat - continue;
            if ((i === rowIdx && j === colIdx) ||
                (j < 0 || j >= board[i].length)) continue;

            if (board[i][j].isBomb) neigboursCount++;
        }
    }
    return neigboursCount;
}



function setMinesNegsCount(board) {
    var newBoard = [];

    for (var i = 0; i < board.length; i++) {
        newBoard[i] = [];
        for (var j = 0; j < board.length; j++) {
            var cell = board[i][j];
            cell.value = (!cell.isBomb) ? getNeighborsCount(board, i, j) : 0;
        }
    }
    return newBoard;
}
function bulidBoard() {
    var board = [];
    var size = gLevel.SIZE;
    for (var i = 0; i < size; i++) {
        board[i] = [];
        for (var j = 0; j < size; j++) {
            board[i][j] = createCell('cellObj' + i + '-' + j, 0)
        }
    }
    makeBombs(board);
    setMinesNegsCount(board);
    return board;
}

function makeBombs(board) {

    var bombsLength = gLevel.MINES;

    for (var i = 0; i < bombsLength; i++) {
        var rndIdx = getRandomInt(0, board.length);
        var rndJdx = getRandomInt(0, board.length);

        if (board[rndIdx][rndJdx].isBomb) i--;

        board[rndIdx][rndJdx].isBomb = true;
    }
}

function createCell(id, val) {
    return {
        name: id,
        value: val,
        isBomb: false,
        isMarked: false,
        isClicked: false,

    }
}
function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < board.length; j++) {
            var cell = row[j];


            if (!cell.isMarked && !cell.isClicked) {

                var cellContent = '<img src="img/block.png" >';
                var className = (cell.value > 0) ? 'CellNum' : 'Empty cell';
            }
            else if (cell.isMarked) {
                console.log('marked found');
                var cellContent = '<img src="img/flag.png" >';
                var className = (cell.value > 0) ? 'CellNum' : 'Empty cell';

            }
            if (cell.isClicked) {
                var cellContent = (cell.value > 0) ? cell.value : '';
                if (cell.isBomb) {
                    cellContent = '<img src="img/bomb.png" >';
                }

            }
            var className = (cell.value > 0) ? 'CellNum' : 'Empty cell';

            if (cell.isBomb) {
                var className = 'bomb';
            }
            var cellTitle = cell.name;
            var tdId = 'cell-' + i + '-' + j;

            strHtml += '<td title="' + cellTitle + '" id="' + tdId + '" onclick="cellClicked(this,' + i + ',' + j + ')" oncontextmenu="cellMarked(this); return false;" ' +
                'class="    ' + className + '">' + cellContent +
                '</td>';
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.gameBoard');
    elMat.innerHTML = strHtml;

}


function cellClicked(elCell, i, j) {
    console.log('click');
    console.log('isgameon?', gState.isGameOn);
    // elCell.innerHTML = '<img src="img/bomb.png">';
    if (!gState.isGameOn && gState.secsPassed === 0) {
        console.log('Game on!');
        gState.isGameOn = true;
        gState.secsPassed = Date.now();
    }
    if (gState.isGameOn) {
        expandShown(elCell, i, j);
        var elshownCount = document.querySelector('.showCount');
        elshownCount.innerHTML = 'Shown Count:' + gState.shownCount;
        renderBoard(gBoard);
        checkGameOver();
    }
}


function cellMarked(elCell) {
    //console.log('right-click');
    var elId = elCell.id;
    //console.log('id,', elId);
    var cellCoors = getCoors(elId);
    //console.log('coors,', cellCoors);
    var cell = gBoard[cellCoors[0]][cellCoors[1]];
    //console.log(cell);
    var elshowMarked = document.querySelector('.marked');
    if (gState.isGameOn) {
        if (cell.isMarked) {
            elCell.classList.remove("marked");
            gBoard[cellCoors[0]][cellCoors[1]].isMarked = false;
            gState.markedCount -= 1;
            elshowMarked.innerHTML = 'Flags:' + gState.markedCount;
        }
        else {
            elCell.classList.add("marked");
            gBoard[cellCoors[0]][cellCoors[1]].isMarked = true;
            gState.markedCount += 1;
            elshowMarked.innerHTML = 'Flags:' + gState.markedCount;
            checkGameOver();
        }
        renderBoard(gBoard);
    }
}

function checkGameOver() {
    console.log('check game over');
    var numOfCells = gLevel.SIZE ** 2;
    var numOfFlags = gState.markedCount;
    var numOfShown = gState.shownCount;

    if (numOfShown + numOfFlags === numOfCells) {
        console.log('Game Over!');
        endGame(true);
    }



}

function openAllBombs() {
    console.log('open all bombs');
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].isBomb) {
                gBoard[i][j].isClicked = true;
            }
        }
    }
    endGame(false);
}

function endGame(win) {
    gState.isGameOn = false;
    gState.secsPassed = Date.now() - gState.secsPassed;
    var readableTime = (gState.secsPassed / 1000).toFixed(0);;
    var elTime = document.querySelector('.time');
    elTime.innerHTML = 'Time Passed: ' + readableTime;
    changeToDiplay('.matchEnd', true);
    if (win) {
        var elEndPic = document.querySelector('.endPic');
        elEndPic.innerHTML = '<img src="img/win.png">';
    }
    else {
        var elEndPic = document.querySelector('.endPic');
        elEndPic.innerHTML = '<img src="img/lose.png">';
    }
}

function expandShown(elCell, rowIdx, colIdx) {
    console.log('expand');
    var cell = gBoard[rowIdx][colIdx];

    if (cell.isBomb && !cell.isClicked) {
        openAllBombs();
        return;
    }
    
    if (cell.value > 0 && !cell.isClicked) {
        gBoard[rowIdx][colIdx].isClicked = true;
        gState.shownCount += 1;
    }
    else if (cell.value > 0 && cell.isClicked) {

    }
    else {
        openBlanks(elCell, rowIdx, colIdx);
    }


}


function openBlanks(elCell, rowIdx, colIdx) {
    //debugger;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {

        if (!(i >= 0 && i < gBoard.length)) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            // of out of mat - continue;
            var cell = gBoard[i][j];

            if ((j < 0 || j >= gBoard[i].length)) continue;
            //if cell is number and not a bomb
            if (cell.value > 0 && !cell.isBomb && !cell.isClicked) {
                gState.shownCount += 1;
                gBoard[i][j].isClicked = true;
            }
            //if cell is empty and not clicked
            else if (cell.value === 0 && !cell.isClicked) {
                gState.shownCount += 1;
                gBoard[i][j].isClicked = true;
                expandShown(elCell, i, j);

            }
        }
    }
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


function getCoors(cellId) {
    var rowIdx = cellId.indexOf('-');
    var colIdx = cellId.lastIndexOf('-');

    var coorI = +cellId.substring(rowIdx + 1, colIdx);
    var coorJ = +cellId.substring(colIdx + 1);
    var coors = [coorI, coorJ];

    return coors;
}