'use strict';
/*
sokoban
*/
var gBoard;
var gGamerPos;
var gState;
var gSize = 10;
var stepsCountDown;
var gGameRender;
var gBonusState;
var gObstacleState;
initGame();


function reset() {
    gGamerPos = [6, 6];
    gBonusState = { time: 0, cell: 0, removed: false, magnets: 0, clickedMagnet: false, boxToMagnetPos: [] };
    gState = { isGameOn: false, steps: 0, pushes: 0, target: 0, boxes: 2, secsPassed: 0 };
    gObstacleState = { stop: false }
    stepsCountDown = 100;
    printedReset();

}


function initGame() {
    reset();
    gBoard = createBoard();
    //create walls in the endges of the board
    createWalls();
    console.log(gBoard);
    //create boxes targets and walls manually inside the board
    createInsideTheFloor();
    //create 1 bonus
    createBonus();
    //create obstacles
    createObstacles(3);

    renderBoard();
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
            bonus: false,
            obstacle: false,
        },
        isClicked: false,

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
                if(cell.type.target) {
                    className += ' targeted';
                } 
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
                var className = 'bonus';
            }
            else if (cell.type.obstacle) {
                var cellContent = '<img src="img/' + cell.type.obstacle + '.png" >';
                var className = 'obstacle';
            }
            else {
                var cellContent = '';
                var className = 'empty';
            }
            if (gGamerPos[0] === i && gGamerPos[1] === j) {
                var cellContent = '<img src="img/player.png" >';
                var className = 'player';
            }
            if (cell.isClicked) {
                className += ' marked';
            }


            var cellTitle = 'cell';
            var tdId = 'cell-' + i + '-' + j;

            strHtml += '<td title="' + cellTitle + '" id="' + tdId + '"  ' +
                'class="    ' + className + '" onclick="initMagnet(this,' + i + ',' + j + ')" onmouseover="mouseOver(this)">' + cellContent +
                '</td>';
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.gameBoard');
    elMat.innerHTML = strHtml;

}
function mouseOver(elCell) {

    // console.log('mouseover');
    if (gBonusState.clickedMagnet) {
        elCell.style.backgroundColor = 'rgb(19, 120, 20)';
        // elCell.innerHTML = '<img src="img/box.png" >';
        // elCell.style.opacity = '0.6';
    }




}
function initMagnet(elCell, i, j) {
    console.log('cell Clicked');

    if (gBonusState.magnets > 0 && !gObstacleState.stop) {

        var newCell = gBoard[i][j];
        if (gBonusState.clickedMagnet) {
            console.log('where to put the box');


            var prevCell = gBoard[gBonusState.boxToMagnetPos[0]][gBonusState.boxToMagnetPos[1]];

            var newCell = gBoard[i][j];

            if (newCell.type.target) {
                console.log('Not allowed to magnet the box to the target!');
                alert('Not allowed to magnet the box to the target!');
            }
            else if (gBonusState.boxToMagnetPos[0] !== i || gBonusState.boxToMagnetPos[1] !== j && !newCell.type.box && !newCell.type.wall) {
                console.log('change place magnet');
                gBonusState.clickedMagnet = false;
                prevCell.type.box = false;
                newCell.type.box = true;
                gBonusState.magnets--;
                if (prevCell.type.target) gState.target--;
                gBoard[gBonusState.boxToMagnetPos[0]][gBonusState.boxToMagnetPos[1]].isClicked = false;

            }

            var elMagnets = document.querySelector('.magnets');
            elMagnets.innerHTML = '<img src="img/magnet.png" >' + gBonusState.magnets;
            checkGameOver();


        }
        else if (newCell.type.box) {
            gBonusState.clickedMagnet = true;
            gBonusState.boxToMagnetPos = [i, j];
            // elCell.style.backgroundColor = rgb(99, 192, 130);
            newCell.isClicked = true;
            // elCell.style.backgroundColor = 'red';

        }
        renderBoard();
    }

}



function initBonus(cell) {
    console.log('bonus!');
    if (cell.type.bonus === 'clock') {
        console.log('clock');
        stepsCountDown += 10;
    } else if (cell.type.bonus === 'gold') {
        console.log('gold');
        stepsCountDown += 100;

    } else {
        console.log('magnet');
        gBonusState.magnets++;
        var elMagnets = document.querySelector('.magnets');
        elMagnets.innerHTML = '<img src="img/magnet.png" >' + gBonusState.magnets;

    }
    cell.type.bonus = false;
    gBonusState.removed = true;

}
function initGlueObstacle(cell) {
    console.log('obstacle!');
    if (cell.type.obstacle === 'glue') {
        console.log('glue');
        gObstacleState.stop = true;
        setTimeout(function () { gObstacleState.stop = false; }, 5000);
    }

}

function createBonus() {
    var rndiIdx = getRandomInt(0, gBoard.length);
    var rndjIdx = getRandomInt(0, gBoard[0].length);
    var bonuses = ['clock', 'magnet', 'gold'];

    var cell = gBoard[rndiIdx][rndjIdx];
    if (!cell.type.box && !cell.type.wall && !cell.type.target && !cell.type.obstacle) {
        var rndBonus = getRandomInt(0, bonuses.length);
        cell.type.bonus = bonuses[rndBonus];
        // cell.type.bonus = bonuses[1]; //to check only magnet
        gBonusState.cell = cell;

    } else {
        createBonus();
    }

}

function createObstacles(count) {
    for (var i = 0; i < count; i++) {
        obsatcleCreate();
    }
}
function obsatcleCreate() {

    var rndiIdx = getRandomInt(0, gBoard.length);
    var rndjIdx = getRandomInt(0, gBoard[0].length);
    var obstacles = ['glue', 'water'];

    var cell = gBoard[rndiIdx][rndjIdx];

    if (!cell.type.box && !cell.type.wall && !cell.type.target && !cell.type.obstacle && !cell.type.bonus) {
        var rndObstacle = getRandomInt(0, obstacles.length);
        cell.type.obstacle = obstacles[rndObstacle];
    } else {
        obsatcleCreate();
    }


}


function printSteps() {
    var score = stepsCountDown - gState.steps;
    var elScore = document.querySelector('.score');
    elScore.innerHTML = 'Score:' + score;
    var elScore = document.querySelector('.steps');
    elScore.innerHTML = 'Steps:' + gState.steps;

}

function validSteps() {

    return (gState.steps <= stepsCountDown);
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

function getCellIndexByNum(iIdx, jIdx, isUp, isDown, isLeft, isRight, num) {

    var nextCellIndex = isUp ? [iIdx + -num, jIdx]
        : isDown ? [iIdx + +num, jIdx]
            : isRight ? [iIdx, jIdx + num]
                : isLeft ? [iIdx, jIdx - num] : 0;

    return nextCellIndex;
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

function checkForBoxAndWall(iIdx, jIdx, isUp, isDown, isLeft, isRight) {

    //define nextCell based on the parameter sent
    var nextCellIndex = getCellIndexByNum(iIdx, jIdx, isUp, isDown, isLeft, isRight, 1)


    var cell = gBoard[iIdx][jIdx];


    if (!cell.type.wall) {

        if (cell.type.bonus) {
            initBonus(cell);

        } else if (cell.type.obstacle) {
            initGlueObstacle(cell);
        }

        if (cell.type.box) {

            if (!isOutOfRange(nextCellIndex[0], nextCellIndex[1])) {

                var nextCell = gBoard[nextCellIndex[0]][nextCellIndex[1]];
                var newPlayerPos = [iIdx, jIdx];
                if (nextCell.type.obstacle === 'water') {
                    var count = 0;
                    while (!nextCell.type.wall && !nextCell.type.box) {

                        var cellBeforeWall = nextCell;

                        var newIndex = getCellIndexByNum(nextCellIndex[0], nextCellIndex[1], isUp, isDown, isLeft, isRight, 1)

                        nextCellIndex = newIndex;
                        nextCell = gBoard[nextCellIndex[0]][nextCellIndex[1]];
                        count++;

                    }
                    console.log('water');
                    gState.steps += count - 1;
                    var playerPos = getCellIndexByNum(iIdx, jIdx, isUp, isDown, isLeft, isRight, count - 1);
                    changePlayerPos(playerPos[0], playerPos[1])
                    cell.type.box = false;
                    cellBeforeWall.type.box = true;
                }

                else if (!nextCell.type.box && !nextCell.type.wall) {

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
        elShowWin.style.backgroundColor = 'red';
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


