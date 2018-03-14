'use strict'

var numOfBalloons;
var gBoardLength = 4;
var gNums;
var gCountedNum = 1;
var startTime;
var startedGame = false;
var completedNumTime;
var boardCellsCount = gBoardLength ** 2;



function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function createUniqueNums() {
    var nums = [];
    var count = boardCellsCount;
    for (var i = 1; i <= count; i++) {
        nums.push(i);
    }
    return nums;
}



function reset() {
    gCountedNum = 1;
    document.querySelector('.time').innerHTML = null;
    startedGame = false;

}

function gameStart(len) {
    gBoardLength = len;
    console.log(len);
    boardCellsCount = gBoardLength ** 2;
    gNums = createUniqueNums();
    console.log(gNums)
    reset();
    printStats();
    setBoard();

}

function printStats () {
    var elNext = document.querySelector('.nextNumber');
    elNext.innerHTML = 'Next Number: <br>'+gCountedNum;
    if(startedGame){
    var elTime = document.querySelector('.time');
    elTime.innerHTML = ((completedNumTime - startTime)/1000).toFixed(3);
    }
}

function setBoard() {
    var boardStr = '';
    console.log('start board');
    for (var i = 0; i < gBoardLength; i++) {
        boardStr += '<tr class="row">';
        for (var j = 0; j < gBoardLength; j++) {
            var rndNum = getRandomIntInclusive(0,gNums.length-1);
            var rndFromNums = gNums.splice(rndNum,1)[0];
            boardStr += '<td class="cell" onclick="cellClicked(this)">'+rndFromNums+'</td>';

        }
        boardStr += '</tr>'
    }
    
    var elTable = document.querySelector('.tblGame');
    elTable.innerHTML = boardStr;
}

function cellClicked(elCell) {
    if(!startedGame) {
        startTime = Date.now();
        startedGame = true;
    }

    var currNum = +elCell.innerHTML;
    if(currNum === gCountedNum) {
        elCell.classList.add('selected');
        completedNumTime = Date.now();
        gCountedNum =  (gCountedNum === boardCellsCount) ? 'Done!' : ++gCountedNum;
        
        printStats();
    }
    
}



var form = document.querySelector("form");
// var log = document.querySelector("#log");

// form.addEventListener("submit", function(event) {
//   var data = new FormData(form);
//   console.log(data);
// //   for (const entry of data) {
// //     output = entry[1];
// //   };
// //   log.innerText = output;
// //   event.preventDefault();
// }, false);

var data = new FormData(form);
  console.log(data);