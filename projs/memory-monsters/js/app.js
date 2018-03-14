// Those are global variables, they stay alive and reflect the state of the game
var elPreviousCard = null;
var flippedCouplesCount = 0;
var gamestart = 0;
// varible for 2 cards max flipped
var check2c = null;
var gamestartime = null;
var gamestoptime = null;
// Win var thats get defined on page load - based on how many pairs the page has
var TOTAL_COUPLES_COUNT;
//Used for Remembering list of users - for future developing
var usernamenumber=0;
var lastuser1;
var uName1;

//On page load
document.addEventListener("DOMContentLoaded", function(){
    

    var pagename = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

    //Make footer fixed when there is enough space to it

    if (window.innerHeight +150 >= screen.height) {
        console.log("fixed");
        var adjust = document.querySelector('.footer');
        adjust.classList.add('makefixed');
     }
     
    
    console.log("innerheight" + window.innerHeight);
    console.log("screenheight" + screen.height);
    usernamesetbegin();
    console.log("before");
    if(pagename=== "index.html")
    {
        if(localStorage.getItem('bestime-user') != null){
        bestscoretable();
        }
    }
    else if(pagename === "game.html") {
        //If you want to check the game more easly thumbs down the shufflecards
        shufflecards();
        if(localStorage.getItem('bestime-ms') != null)  {
            
            bestimeshow();
            
            console.log("before");
            
            var elem = document.getElementById('rstscore');
            elem.classList.remove('vanish');
        } 

    }

    

    
    var boardcards = document.querySelector('.gameboard').children.length;
    console.log(boardcards);
    TOTAL_COUPLES_COUNT = boardcards/2;
    console.log(TOTAL_COUPLES_COUNT);
});

//Change username when notyou? activated
function usernamenotyou(){
    
    console.log("new username");
    usernameset();
}

//Checks for Username on start(in case there is display it) and also checks for lastuser that applied(to display the last user)
function usernamesetbegin(){
    
    lastuser1 = localStorage.getItem('lastuser');
    
    if(lastuser1 != null)
    {
    uName1 = lastuser1.toString();
    console.log(lastuser1);
    var uName = localStorage.getItem(uName1);
    document.getElementById('usernamepage').innerHTML = "Hello "+ uName+ "!";
    return;
    }

    usernamenumber++;
    if(localStorage.getItem('username'+usernamenumber) === null){ 
        username = prompt("What is your name?");
        while(username === "" || username === null)
        {
            alert("You must enter a name");
            username = prompt("What is your name?");
        }
        if(username === null) {
            return;
        }
        console.log("before usrname set");
        localStorage.setItem('username'+usernamenumber,username);
        }
        
        localStorage.setItem('lastuser','username'+usernamenumber);
        lastuser1 = localStorage.getItem('lastuser');
        
        uName1 = lastuser1.toString();
        var uName = localStorage.getItem(uName1);
        console.log(lastuser1);
        document.getElementById('usernamepage').innerHTML = "Hello "+ uName+ "!";
        
}

//gets last number of a string
function getLastDigits(s) {
    var a = s.match(/\d+$/)[0];
    return parseInt(a);

}

//Adds new Username
function usernameset(){

    console.log("set start");
    lastuser1 = localStorage.getItem('lastuser');
    console.log(lastuser1); 
    var userdigit = getLastDigits(lastuser1);
    console.log(userdigit);
    usernamenumber = userdigit;
    console.log(usernamenumber);
    usernamenumber++;
    console.log(usernamenumber);

    if(localStorage.getItem('username'+usernamenumber) === null){ 
        username = prompt("What is your name?");
        while(username === "" || username === null)
        {
            alert("You must enter a name");
            username = prompt("What is your name?");
        }
        if(username === null) {
            return;
        }
        console.log("before usrname set");
        localStorage.setItem('username'+usernamenumber,username);
        }
        
        localStorage.setItem('lastuser','username'+usernamenumber);
        lastuser1 = localStorage.getItem('lastuser');
        
        uName1 = lastuser1.toString();
        var uName = localStorage.getItem(uName1);
        console.log(lastuser1);
        document.getElementById('usernamepage').innerHTML = "Hello "+ uName+ "!";
        
}

//Remove all Usernames
function removeusers()
{
    console.log("remove users");
    lastuser1 = localStorage.getItem('lastuser');
    console.log(lastuser1); 
    var userdigit = getLastDigits(lastuser1);
    for (var i = 1; i <= userdigit; ++i) 
    {
        localStorage.removeItem('username' + i); 
        console.log("removed" + i);
    } 
    localStorage.removeItem('lastuser'); 
    console.log("aaa");
    document.querySelector('.usernameshow').innerHTML = "";
    console.log("aaa");
    
}

//Shuffle the cards
function shufflecards(){
    var board = document.querySelector('.gameboard');
    for (var i = board.children.length; i >= 0; i--) {
        board.appendChild(board.children[Math.random() * i | 0]);
    } 
     
}



//Hide\show the game buttons with the class method
function hideTheButton(thebutton) {
    console.log("check1");
    if(thebutton.classList.contains('vanish')){
        console.log("display");
        thebutton.classList.remove('vanish');
        
    }
    else{
        console.log("dont display");
        thebutton.classList.add('vanish');
       
    }
    
    
    
}

//Shows on index.html the best score with the user who broke the record
function bestscoretable() {
    console.log("tablestart");
    
    var usernameitema = localStorage.getItem('bestime-user');
    var bestscoreitem = (localStorage.getItem('bestime-ms')/1000);
    bestscoreitem = bestscoreitem.toFixed(1);
    
    document.querySelector('.bestscoretable').innerHTML = "<h1>Best Score</h1> <br> <table> <tr> <th>Username</th> <th>Score</th> </tr> <tr> <td>"+usernameitema+"</td> <td>"+bestscoreitem+"</td> </tr></table>";
    console.log("tablechecked");
      
    

}
//Show the best time on html using innerHTML
function bestimeshow(){
    var best = (localStorage.getItem('bestime-ms')/1000);
    console.log("trying");
    document.querySelector('.bestimeclass').innerHTML = "Best Score <br>" + best.toFixed(1);
    var elem = document.getElementById('rstscore');
    elem.classList.remove('vanish');
    var elem = document.getElementById('scorewrapper');
    elem.classList.remove('vanish');
}

//Remove the best time on html using innerHTML
function bestimeremove() {
    localStorage.removeItem('bestime-ms');
    localStorage.removeItem('bestime-user');
    document.querySelector('.bestimeclass').innerHTML = "";
    var elem = document.getElementById('rstscore');
    elem.classList.add('vanish');
    var elem = document.getElementById('scorewrapper');
    elem.classList.add('vanish');
    
}


//Reset game and shuffle cards
function resetgame() {
    console.log("reset");
    // Those are the global variables
    elPreviousCard = null;
    flippedCouplesCount = 0;
    gamestart = 0;
    check2c = null;
    gamestartime = null;
    gamestoptime = null;
    var again2 = document.getElementById('playagain');
    again2.classList.add('vanish');
    console.log("before divs");
    var divs = document.querySelectorAll(".card.flipped");
    console.log(divs.length);
    divs[0].classList.remove('flipped');
     for (var i = 0; i < divs.length; ++i) 
     {
         divs[i].classList.remove('flipped');
     } 
     shufflecards();  
    }


//Shuffle the cards



// This is a constant that we dont change during the game (we mark those with CAPITAL letters)

// Load an audio file
var audioWin = new Audio('sound/win.mp3');
var audioWrong = new Audio('sound/wrong.mp3');
var audioRight = new Audio('sound/right.mp3');

// This function is called whenever the user click a card
function cardClicked(elCard) {
    gamestart++;
    //Gamestart check for duration calculation
    if(gamestart ===1)
    {
        gamestartime = Date.now();
        console.log(gamestartime);
        
    }
    //Blocks clicking when cards still flipped or when game ended
    if(check2c === false || gamestoptime != null)
    {
        console.log('exit-click');
        return;
    }

    else    {
        console.log('go-on'); 
        // If the user clicked an already flipped card - alert and return from the function
    if (elCard.classList.contains('flipped')) {
        swal("Card Already Flipped!", "", "warning", {
            buttons: false,
            timer: 1000,
          });
          return;
        
    }

    // Flip it
    elCard.classList.add('flipped');
    
    // This is a first card, only keep it in the global variable
    if (elPreviousCard === null) {
        elPreviousCard = elCard;
    } else {
        
        // get the data-card attribute's value from both cards
        var card1 = elPreviousCard.getAttribute('data-card');
        var card2 = elCard.getAttribute('data-card');
        
      
        // No match, schedule to flip them back in 1 second
        if (card1 !== card2 )
        {
            console.log('no match');
        //play sound without delay
            audioWrong.play();
            check2c = false;
            console.log('check false');
            setTimeout(function () {
                elCard.classList.remove('flipped');
                elPreviousCard.classList.remove('flipped');
                elPreviousCard = null;
                check2c = true;
                console.log('check true');         
            }, 1000)
            
            
            
            
        }
         else 
         {
            console.log('Match!');
            flippedCouplesCount++;
            elPreviousCard = null;
            check2c = false;
            console.log('check false');
            //one sec delay before use can flip card
            setTimeout(function () {
                check2c = true;
                console.log('check true');         
            }, 1000)
            // All cards flipped!
            if (TOTAL_COUPLES_COUNT === flippedCouplesCount) {
                audioWin.play();
                var again2 = document.getElementById('playagain');
                again2.classList.remove('vanish');
                    gamestoptime = Date.now();
                    var score = gamestoptime - gamestartime;
                    //Checks bestime, also if its first time
                    if(score <=localStorage.getItem('bestime-ms') || localStorage.getItem('bestime-ms') === null)
                    {
                        console.log("bestime");
                        var besTime = score;
                        localStorage.setItem('bestime-ms',besTime);
                        var usernameitem = localStorage.getItem(lastuser1);
                        localStorage.setItem('bestime-user',usernameitem);
                        bestimeshow();
                    }
                    console.log(score);
                    
                swal("Good job!", "Your Memory Is Still In Shape", "success", {
                    buttons: false,
                    timer: 2000,
                  });
                
            }
            else{
                 // Yes! a match!
            
            audioRight.play();

            }
            

        }
    }
       
}


}
