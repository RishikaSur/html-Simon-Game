var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

$(document).keydown(function(){
    if(!started)
    {
        $("h1").text("Level " + level);
        started = true;
        nextSequence();
    }
});

function playSound(chosen)
{
    var audio = new Audio("./sounds/" + chosen + ".mp3");
    audio.play();
}

function nextSequence()
{
    userClickedPattern = [];
    level++;

    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function animatePress(currentColour)
{
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        if(gamePattern.length === userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }

    else
    {
        $("h1").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

            restart();
    }
}

function restart()
{
    level = 0;
    started = false;
    gamePattern = [];
}