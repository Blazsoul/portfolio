'use strict';
/*
sokoban
*/
var gBoard;
var gGamerPos;
var gState;
var gSize = 8;
var maxSteps;
var gGameRender;
var gBonusState;
var gObstacleState;
initGame();


function reset() {
    gGamerPos = [6, 6];
    gBonusState = { time: 0, cell: 0, removed: false, magnet: 0 };
    gState = { isGameOn: false, steps: 0, pushes: 0, target: 0, boxes: 2, secsPassed: 0 };
    gObstacleState = { stop: false }
    maxSteps = 60;
    printedReset();

}

function bonusRender() {
    bonusChanger();
    renderBoard();
}

function printedReset() {
    
    var elSteps = document.querySelector('.score');
    elSteps.innerHTML = 'Score:';
    var elShowWin = document.querySelector('.showWin');
    elShowWin.innerHTML = '';
    elShowWin.style.display = 'none';
}
function initGame() {
    reset();
    gBoard = createBoard();

    //create walls in the enges of the board
    createWalls();
    console.log(gBoard);

    //create boxes targets and walls manually inside the board
    createInsideTheFloor();

    //create 1 bonus
    createBonus();
    //create 2 obstacles
    createObsatcle();
    createObsatcle();

    renderBoard();
}
function createBoard() {
    var board = [];

    for (var i = 0; i < gSize; i++) {
        board[i] = [];
        for (var j = 0; j < gSize; j++) {
            board[i][j] = createCell('cellObj' + i + '-' + j, 0)
        }
    }
    return board;

}

function createCell(cellname, val) {
    return {
        name: cellname,
        value: val,
        type: {
            box: false,
            wall: false,
            target: false,
            bonus : false,
            obstacle: false,
        },
        isClicked: false,

    }
}

function renderBoard() {
    var strHtml = '';
    for (var i = 0; i < gBoard.length; i++) {
        var row = gBoard[i];
        strHtml += '<tr>';
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j];

            if (cell.type.box) {
                var cellContent = '<img src="img/box.png" >';
                var className = 'box';
            }
            else if (cell.type.wall) {
                var cellContent = '<img src="img/wall2.png" >';
                var className = 'wall';
            }

            else if (cell.type.target) {
                var cellContent = '<img src="img/target.png" >';
                var className = 'target';
            }
            else if (cell.type.bonus) {
                var cellContent = '<img src="img/' + cell.type.bonus + '.png" >';
                var className = '';
            }
            else if (cell.typeObstacle) {
                var cellContent = '<img src="img/' + cell.typeObstacle + '.png" >';
                var className = '';
            }
            else {
                var cellContent = '';
                var className = '';
            }
            if (gGamerPos[0] === i && gGamerPos[1] === j) {
                var cellContent = '<img src="img/player.png" >';
                var className = 'player';
            }


            var cellTitle = 'cell';
            var tdId = 'cell-' + i + '-' + j;

            strHtml += '<td title="' + cellTitle + '" id="' + tdId + '"  ' +
                'class="    ' + className + '">' + cellContent +
                '</td>';
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.gameBoard');
    elMat.innerHTML = strHtml;

}

function isOutOfRange(iIdx, jIdx) {
    var isRowValid = (iIdx > gBoard.length - 1) || (jIdx > gBoard[0].length - 1);
    var isColValid = (iIdx < 0) || (jIdx < 0);
    return isRowValid || isColValid;
}

function changePlayerPos(iIdx, jIdx) {
    gGamerPos[0] = iIdx;
    gGamerPos[1] = jIdx;
}

function initBonus(cell) {
    console.log('bonus!');
    if (cell.type.bonus === 'clock') {
        console.log('clock');
        maxSteps += 10;
    } else if (cell.type.bonus === 'gold') {
        console.log('gold');
        maxSteps += 100;
        
    } else {
        console.log('magnet');
        gBonusState.magnet++;

    }
    cell.type.bonus = false;
    gBonusState.removed = true;

}
function initObstacle(cell) {
    console.log('obstacle!');
    if (cell.typeObstacle === 'glue') {
        console.log('glue');
        gObstacleState.stop = true;
        setTimeout(function () { gObstacleState.stop = false; }, 5000);
    }
    else {
        console.log('water');

    }

}

function createBonus() {
    var rndiIdx = getRandomInt(0, gBoard.length);
    var rndjIdx = getRandomInt(0, gBoard[0].length);
    var bonuses = ['clock', 'magnet', 'gold'];

    var cell = gBoard[rndiIdx][rndjIdx];
    if (!cell.type.box && !cell.type.wall && !cell.type.target && !cell.typeObstacle) {
        var rndBonus = getRandomInt(0, bonuses.length);
        cell.type.bonus = bonuses[rndBonus];
        gBonusState.cell = cell;
        
    } else {
        createBonus();
    }

}

function createObsatcle() {
    var rndiIdx = getRandomInt(0, gBoard.length);
    var rndjIdx = getRandomInt(0, gBoard[0].length);
    var obstacles = ['glue', 'water'];

    var cell = gBoard[rndiIdx][rndjIdx];

    if (!cell.type.box && !cell.type.wall && !cell.type.target && !cell.typeObstacle &&!cell.type.bonus) {
        var rndObstacle = getRandomInt(0, obstacles.length);
        cell.typeObstacle = obstacles[rndObstacle];
    } else {
        createObsatcle();
    }

}


function printSteps() {
    var score = maxSteps - gState.steps;
    var elScore = document.querySelector('.score');
    elScore.innerHTML = 'Score:' + score;
    var elScore = document.querySelector('.steps');
    elScore.innerHTML = 'Steps:' + gState.steps;

}

function validSteps() {

    return (gState.steps <= maxSteps);
}

function removeBonus() {
    gBonusState.cell.type.bonus = false;
}

function removeBonusIfPossible() {

    var currTime = Date.now();

    if (currTime - gBonusState.time >= 5000 && !gBonusState.removed) {
        console.log('remove!');
        gBonusState.time = currTime;
        gBonusState.removed = true;
        removeBonus();
    }

}
function addBonusIfPossible() {
    var currTime = Date.now();
    if (currTime - gBonusState.time >= 10000 && gBonusState.removed) {

        console.log('addBonus!');
        createBonus();
        gBonusState.time = currTime;
        gBonusState.removed = false;
    }
}

function bonusChanger() {
    addBonusIfPossible();
    removeBonusIfPossible();
}

function movePlayer(iIdx, jIdx, side) {

    if (!gState.isGameOn && gState.steps === 0) {
        console.log('Game on!');
        gState.isGameOn = true;
        gState.secsPassed = Date.now();
        gBonusState.time = Date.now();
        gGameRender = setInterval(bonusRender, 1000);
    }
    if (gState.isGameOn && !gObstacleState.stop) {

        bonusChanger();
        gState.steps++;


        if (validSteps()) {
            switch (side) {
                case 'up': checkForBoxAndWall(iIdx, jIdx, true, false, false, false);
                    break;

                case 'down': checkForBoxAndWall(iIdx, jIdx, false, true, false, false);
                    break;

                case 'left': checkForBoxAndWall(iIdx, jIdx, false, false, true, false);
                    break;

                case 'right': checkForBoxAndWall(iIdx, jIdx, false, false, false, true);
                    break;

            }
        } else {
            endGame(false);
        }

    }
    printSteps();
    checkGameOver();
    renderBoard(gBoard);
}

function checkForBoxAndWall(iIdx, jIdx, isUp, isDown, isLeft, isRight) {

    //define nextCell based on the parameter sent
    var nextCellIndex = isUp ? [iIdx + -1, jIdx]
        : isDown ? [iIdx + +1, jIdx]
            : isRight ? [iIdx, jIdx + 1]
                : isLeft ? [iIdx, jIdx - 1] : 0;

    var cell = gBoard[iIdx][jIdx];


    if (!cell.type.wall) {

        if (cell.type.bonus) {
            initBonus(cell);

        } else if (cell.typeObstacle) {
            initObstacle(cell);
        }

        if (cell.type.box) {

            if (!isOutOfRange(nextCellIndex[0], nextCellIndex[1])) {

                var nextCell = gBoard[nextCellIndex[0]][nextCellIndex[1]];
                if (!nextCell.type.box && !nextCell.type.wall) {

                    cell.type.box = false;
                    nextCell.type.box = true;

                    if (cell.type.target) gState.target--;

                    if (nextCell.type.target) gState.target++;

                    changePlayerPos(iIdx, jIdx)
                }
            } else {
                changePlayerPos(iIdx, jIdx)
            }

        } else {
            changePlayerPos(iIdx, jIdx)
        }
    }
}


function checkGameOver() {

    if (gState.boxes === gState.target) {
        endGame(true);
    }
}

function endGame(win) {
    var elShowWin = document.querySelector('.showWin');
    if (win) {
        elShowWin.innerHTML = 'Done!';
        elShowWin.style.display = 'inline-block';
        console.log('Win!');

    } else {
        elShowWin.innerHTML = 'Game Over!';
        elShowWin.style.display = 'inline-block';
        console.log('Game Over!');
    }
    gState.isGameOn = false;
    clearInterval(gGameRender);
}


function createWalls() {
    var rowLength = gBoard.length;
    var colLength = gBoard[0].length;

    for (var i = 0; i < rowLength; i++) {
        var row = gBoard[i];
        for (var j = 0; j < colLength; j++) {
            var cell = row[j];
            if (i === 0 || j === 0 || i === rowLength - 1 || j === colLength - 1) {
                cell.type.wall = true;
            }

        }
    }
}



function createInsideTheFloor() {


    //targets
    gBoard[1][2].type.target = true;
    gBoard[2][2].type.target = true;


    //walls
    gBoard[5][4].type.wall = true;
    gBoard[4][4].type.wall = true;

    //boxes
    gBoard[3][3].type.box = true;
    gBoard[3][2].type.box = true;

}



document.addEventListener('keydown', function (event) {
    var iIdx = gGamerPos[0];
    var jIdx = gGamerPos[1];
    if (event.keyCode == 37) {
        console.log('Left was pressed');
        movePlayer(iIdx, jIdx - 1, 'left');
    }
    else if (event.keyCode == 39) {
        movePlayer(iIdx, jIdx + 1, 'right');
        console.log('Right was pressed');
    }
    else if (event.keyCode == 38) {
        movePlayer(iIdx - 1, jIdx, 'up');
        console.log('up was pressed');
    }
    else if (event.keyCode == 40) {
        movePlayer(iIdx + 1, jIdx, 'down');
        console.log('down was pressed');
    }
}, true);


