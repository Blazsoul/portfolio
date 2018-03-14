'use strict'
var gNum = getRandomIntInclusive(1,5);
console.log('Rolled Number: ',gNum);

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function buttonClicked () {
    var userNum = +prompt('What is your number?');
    var elTblProducts = document.querySelector('.tbl-products');
    var showText = document.querySelector('.textOutput');
    if(userNum) {
        if(userNum === gNum) {
            console.log('Nice! you gueesed the right number!');
            showText.innerHTML = 'Nice! you gueesed the right number!';
        }
        else {
            console.log('Wrong number! try again');
            showText.innerHTML = 'Wrong number! try again';

        }
    }
}
