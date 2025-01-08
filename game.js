// alert("hi");
var buttonColours = ["red","blue","green","yellow"];
var gamePattern =[];
var userClickedPattern =[];
var gameStarted = false;
var level = 0;



// Next Sequence
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    var audio = new Audio("./sounds/"+randomChosenColour+".mp3");
    audio.play();
};

// User Clicked Pattern
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


// Sound
function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
};


// Animation
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
};

// onClick event
$(document).on("keydown",function(){
    if (!gameStarted) {
        $("#level-title").text("Level "+level);
        nextSequence();
        gameStarted = true; 
    };
});


// Check Answer
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }

    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
    }
    console.log("userClickedPattern: ", userClickedPattern);
    console.log("gamePattern: ", gamePattern);
}

// Start Over
function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}