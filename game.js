//window.onload = alert("La pagina è stata caricata!");
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Detect when a keyboard key is pressed
$(document).keypress(function() {
    // Check if this is the first key press
    if (!started) {
      //Change the title to Level 0
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
});

$(".btn").click(function() {
    // Create a variable to store the id of the clicked button
    var userChosenColour = $(this).attr("id");
    //add the selected colour to the user Pattern
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
});

//create a function to check the answer of the player
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //console.log("Success!");
    //If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){
      //Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else {
    //console.log("Wrong!");
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

//create a function to generate the game sequence
function nextSequence() {
  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  //increase the level
  level++;
  //modify the h1 title
  $("#level-title").text("Level " + level);
  //create a random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);
  //associate the random number to a colour
  var randomChosenColour = buttonColours[randomNumber];
  //add the generated colour to the game pattern
  gamePattern.push(randomChosenColour);
  //add fade effect
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //play the sound
  playSound(randomChosenColour);
  //console.log(level);
}

//create a function to animate the User Clock
function animatePress(currentColour) {
  //add the pressed class
  $("#" + currentColour).addClass("pressed");
  //remove the pressed after 100 milliseconds
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//create a function for the Audio
function playSound(sound) {
  var audio = new Audio("sounds/" + sound + ".mp3");
  audio.play();
}

//Create a function to restart the game
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
