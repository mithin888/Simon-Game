// The Simon Game

// Grab all buttons
const buttons = $(".btn");

// Empty array that keeps track of AI pattern and player pattern
let aiPattern = [];
let playerPattern = [];

// initialize variabled that will keep track of index check and level
let index = 0;
let level = 1;

// Creates a function that selects a random block between 0-3 and assigns the pressed class for 0.25 seconds. Returns the random block that was selected
function randomBlock() {
  playerPattern = [];
  index = 0;
  // creates a random number and initialized id
  let randomNumber = Math.floor(Math.random() * 4);
  let id = buttons.eq(randomNumber).attr("id");
  // adds the "pressed" class to random button after 250ms delay
  setTimeout(() => {
    buttons.eq(randomNumber).addClass("pressed");
    new Audio(`sounds/${id}.mp3`).play();
  }, 250);

  // removes the "pressed" class after 500ms delay
  setTimeout(() => {
    buttons.eq(randomNumber).removeClass("pressed");
  }, 500);

  aiPattern.push(id);
  console.log(`Computer: ${aiPattern}`);
  return buttons.eq(randomNumber).attr("id");
}

// create an event listener that keeps track of player's blocks. If the user clicks the correct block, step one more block into the pattern (run randomBlock). If user clicks the wrong block, game over function runs
buttons.click((e) => {
  let id = e.target.id;
  playerPattern.push(id);
  $(`#${id}`).addClass("pressed");
  new Audio(`sounds/${id}.mp3`).play();
  setTimeout(() => {
    $(`#${e.target.id}`).removeClass("pressed");
  }, 100);
  console.log(`Player: ${playerPattern}`);
  // checks to see if the current player pattern index matches AI index
  if (playerPattern[index] === aiPattern[index]) {
    // if we have not reached the end of the index, increment index to check next index
    if (playerPattern.length < aiPattern.length) {
      index++;
    }

    // if we have reached the end of the index, run randomBlock after 250ms
    if (playerPattern.length === aiPattern.length) {
      setTimeout(() => {
        level++;
        $("h1").text(`Level ${level}`);
        randomBlock();
      }, 500);
    }
  } else {
    gameOver();
  }
});

// Changes h1, plays "wrong" sound, and flashes red
function gameOver() {
  console.log("fail");
  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  level = 1;
  aiPattern = [];
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 100);
  new Audio("sounds/wrong.mp3").play();
}

// press a key to start the game
$("body").keypress(() => {
  $("h1").text(`Level ${level}`);
  randomBlock();
});
