let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

$(document).keypress(function(event){
    if (event.key == "a"){ 
        level= 0;
        gamePattern = [];
        nextSequence(); 
    }
});

function nextSequence(){
    userClickedPattern = [];
    
    level = level +1 ;
    let currentLevel = "Level "+level;
    $("h1").text(currentLevel);
    let a = (Math.random()*4);
    let randomNumber = Math.floor(a);
    let randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);

    let id = "#"+gamePattern[gamePattern.length -1];
    $(id).animate({opacity: '0.5'});
    $(id).animate({opacity: '1.0'});
    console.log(gamePattern[gamePattern.length -1]);
    playSound(gamePattern[gamePattern.length -1]);

    
}

function playSound(color){
    var sound = new Audio("sounds/"+ color +".mp3");
    sound.play();

}

function animatePress(currentColour){
    let id = "#"+currentColour ;
    $(id).addClass("pressed");
    setTimeout(function(){
        $(id).removeClass("pressed");
    },100);
}
 
function animateGameOver(){
    $("body").addClass("game-over");
    // setTimeout(function(){
    //     $("div").removeClass("game-over");
    // },500);
}

$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    // console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length -1) ;
});

function checkAnswer(pressBtn){
    if(gamePattern[pressBtn] == userClickedPattern[pressBtn]){
        if(gamePattern.length == userClickedPattern.length){
        setTimeout(nextSequence(),3000);
        console.log("success");
        }
    }else{
        console.log("Wrong");
        $("h1").text("Game Over,Press A To Restart");
        playSound(wrong);
        animateGameOver();
        
    }
    
}