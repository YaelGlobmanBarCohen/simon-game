const STARTING_VAL = 0;

var gameOrder = [];
var level = STARTING_VAL;
var i = STARTING_VAL;

// when any key pressed- the game starts:
// level changes to one and the h1 changes accordingly
// rand color appears and sounds and add to the array
$(document).keydown(function(event){
    i = STARTING_VAL;
    level = updateLevel(STARTING_VAL);
    var newColor = runNextButton();
    gameOrder.push(newColor);
    console.log(gameOrder);
});



// when a button clicked:
// i++
// if it's the wrong one- gameOver

// it appears and sounds




$(".btn").click(function(){
    i++;
    var userChosenColor = $(this).attr("id");
    
    if(gameOrder.length == 0 || userChosenColor != gameOrder[i-1]){
        gameOver(level, userChosenColor);
    }
    
    // if it's the i'th click and we're in level i:
        // level increase and the h1 changes
        // i=0
        // runs on the array and the colors appears and sounds one by one
        // rand color appears and sounds and add to the array
    else{
        animateButton(userChosenColor);

        if(i == level){
            setTimeout(function(){
                i = STARTING_VAL;
                level = updateLevel(level);
                // for(let j = 0; j < gameOrder.length; j++){
                //     animateButton(gameOrder[j]);
                // }
                animatePattern(0);
                var patternDuration = gameOrder.length * 500; // Calculate the total time needed for the pattern animations, assuming each animation takes 500ms

                setTimeout(function() {
                    var newColor = runNextButton();
                    gameOrder.push(newColor);
                  }, patternDuration + 500);
            }, 1000);
        }
    }

});


function updateLevel(level){
    level++;
    $("h1").text("Level " + level + " :)");
    return level;
}

function runNextButton(){
    var buttonsColors = ["red", "blue", "green", "yellow"];
    var randNum = Math.floor(Math.random()*4);
    var randChosenColor = buttonsColors[randNum];
    
    animateButton(randChosenColor);

    return randChosenColor;
}

// when gameOver- appears and sounds sound, a message, need everything to be empty and the h1 to say "press a key to start"- and wait to key to press
function gameOver(level, color){
    playSound("wrong");

    $("#"+color).addClass("pressed-wrong");
    setTimeout(function() {
        $("#"+color).removeClass("pressed-wrong");
      }, 200);

    gameOrder = [];

    var lostMessage = "Game over at level " + level
    $("h1").text(lostMessage);
    setTimeout(function() {
        $("h1").text("Press any key to start");
      }, 3000);
}

function animatePattern(index){
    if(index < gameOrder.length){
        setTimeout(function(){
            animateButton(gameOrder[index]);
            animatePattern(index + 1);
        }, 500);
    }
}

function animateButton(color){
    playSound(color);

    $("#"+color).addClass("pressed");
    setTimeout(function() {
        $("#"+color).removeClass("pressed");
      }, 100);
}

function playSound(color){
    var audio = new Audio("./sounds/"+color+".mp3");
    audio.play();
}