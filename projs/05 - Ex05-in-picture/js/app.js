
var gQuests = [{ id: 1, opts: ['This is a Cat!', 'This is a Mouse!'], correctOptIndex: 0 },
{ id: 2, opts: ['This is a glass!', 'This is a hat!'], correctOptIndex: 1 },
{ id: 3, opts: ['This is a mouse over a Cat!', 'This is a Horse! '], correctOptIndex: 0 },
];
var gCurrQuestIdx;
var maxTurns;
var gState = { wrongAnswers: gQuests.length }

function initGame() {
    gCurrQuestIdx = 0;
    maxTurns = gQuests.length;
    gState.wrongAnswers = maxTurns;
    renderQuests();
}

function renderQuests() {
    var elGame = document.querySelector('.gameWrapper');
    var quest = gQuests[gCurrQuestIdx];
    var strHtml = '';
    // for(var i=0;i<gQuests.length;i++) {
    // }
    var completedPercent = parseInt((gCurrQuestIdx / gQuests.length) * 100);
    strHtml += '<img class="startWrapper logoPic bounce" src="img/index.png">';
    strHtml += '<div class="prBarWrapper">';
    strHtml += '<div class="prBar">';
    strHtml += '<div class="prBarFill" style="width:' + completedPercent + '%">';
    strHtml += '</div>';
    strHtml += '</div>';
    strHtml += '<div class="prBarNum"> ' + completedPercent + '%';
    strHtml += '</div>';
    strHtml += '</div>';
    strHtml += '<div style="top:0px" class="imgDiv animated bounceInDown">';
    strHtml += '<div class="ans" onclick="clickedShowAns()">show answer</div>';
    strHtml += '<img class="questPic" src="img/' + quest.id + '.png" onmouseover="showHidden()">'; // 
    strHtml += '</div>';
    strHtml += '<div class="clearboth"></div>';
   
    strHtml += '<div class="answers"">';
    strHtml += '<div class="Button answer1" onclick="checkAnswer(this,' + 0 + ')">' + quest.opts[0] + '</div>';
    // strHtml += '<br>';
    strHtml += '<div class="Button answer2" onclick="checkAnswer(this,' + 1 + ')">' + quest.opts[1] + '</div>';
    strHtml += '</div>';
    elGame.innerHTML = strHtml;
}

function clickedShowAns() {
    console.log('clicked Show Answer');
    var rightAnswer = gQuests[gCurrQuestIdx].correctOptIndex;

    var elAnswer = document.querySelectorAll('.answers')[0].children[rightAnswer];
    console.log('answer:', elAnswer);
    // var elAnswer = document.querySelector(answerStr);
    elAnswer.classList.add('rightAnswer');
}
function showHidden() {
    console.log('showhidden');
    var elshowAns = document.querySelector('.ans');
    elshowAns.classList.toggle('showAns');

    setTimeout(function () {elshowAns.classList.toggle('showAns');},1000);
}
function checkAnswer(elAnswer, userAnswer) {
    var quest = gQuests[gCurrQuestIdx];
    if (userAnswer === quest.correctOptIndex) {
        elAnswer.classList.add("rightAnswer");
        //debugger;
        gCurrQuestIdx++;
        if (gCurrQuestIdx === maxTurns) {
            var completedPercent = parseInt((gCurrQuestIdx / gQuests.length) * 100);
            document.querySelector('.prBarFill').style.width = completedPercent + '%';
            document.querySelector('.prBarNum').innerHTML = completedPercent + '%';
            strHtml = '<div class="rematch"><img src="/img/rematch.png" onclick="initGame()"></div>';
            // strHtml+= '<div class="Button game" onclick="initGame()">Play Again</div>';
            strHtml += '</div>';
            strHtml += '<div class="scoreBar">Score: <span class="scoreNum">' + (gQuests.length / gState.wrongAnswers) * 100 + '</span>';
            strHtml += '</div>';
            document.querySelector('.answers').innerHTML = strHtml;
        }


    }
    else {
        gState.wrongAnswers++;
        elAnswer.classList.add("wrongAnswer");
        var elImgWrapper = document.querySelector('.imgDiv');
        console.log(elImgWrapper);
        elImgWrapper.classList.remove("bounceInDown");
        elImgWrapper.classList.add("shake");
        console.log(elImgWrapper);
    }
    setTimeout(function () { elAnswer.classList.remove("rightAnswer"); elAnswer.classList.remove("wrongAnswer"); }, 700);
    // setTimeout(function() {elAnswer.classList.remove("wrongAnswer");},1500) ;
    setTimeout(function () { renderQuests() }, 1500);
}