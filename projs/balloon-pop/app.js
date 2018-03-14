'use strict';


var moveBalloonsInterval = setInterval(play, 500);
var gBalloons = [];
var gBalloonsCount = 5;
renderBalloons();
addBalloons();
var balloons = document.querySelectorAll('.balloon');



// function createBalloons() {
//     var balloons = [];
//     balloons.push(createBalloons());
//     return balloons;
// }

function renderBalloons() {
    var elBalloon = document.querySelector('.game');
    var strHtml = '';
    for (var i = 0; i < gBalloonsCount; i++) {
        strHtml += '<div class="balloon balloon'+(i+1)+'" style="bottom: 0px;" onclick="popBalloon(this)">';
        strHtml += '</div>'
    }


    // for (var i = 0; i < cars.length; i++) {
    //     var car = cars[i];
    //     strHtml += '<div style="background-color:' + car.color +
    //         '" onclick="carClicked(this, ' + i + ')" class="car car' + (i + 1) + '">' +
    //         car.vendor +
    //         ' <span class="car-speed">' + car.speed + '</span>' +
    //         '</div>'
    // }
    console.log(elBalloon);
    elBalloon.innerHTML = strHtml;

}



function addBalloons() {
    for (var i = 0; i < gBalloonsCount; i++) {
        // var balloon = balloons[i];
        gBalloons[i] = {
            // balloon: balloon,
            bottom: '0px',

            speed: parseInt(Math.random() * 10),
        }
        console.log('Balloon', i + 1, ' speed:', gBalloons[i].speed)
    }
}


function play() {
    updateObjBalloons();
    moveBallons();
}

function updateObjBalloons() {
    for (var i = 0; i < gBalloons.length; i++) {
        var balloon = gBalloons[i];
        var bottom = parseInt(balloon.bottom);
        //console.log(balloon.speed);
        balloon.bottom = bottom + balloon.speed + 'px';

    }
}
function moveBallons() {
    for (var i = 0; i < gBalloonsCount; i++) {
        var balloon = balloons[i];
        var gBottom = gBalloons[i].bottom;
        //console.log(gBottom);
        balloon.style.bottom = gBottom;
    }
}
function popBalloon(elBalloon) {
    var audio = new Audio('sounds/Pop.mp3');
    audio.play();
    elBalloon.classList.add('hide');
}
