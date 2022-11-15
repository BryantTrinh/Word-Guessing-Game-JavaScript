// Set variables
var startButton = document.querySelector(."start-btn");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var wordBlank = document.querySelector(".word-blanks");
var timerElement = document.querySelector(".timer-count");

var chosenWord = "";
var winCounter = 0;
var loseCounter = 0;
var timer;
var timerCount;
var numBlanks = 0;
var isWin = false;

// make an array for the blanks and letters 
var letterChosenWord = [];
var blankLetters = [];

// Array for data type words to guess
var words = ["array", "object", "function", "string", "boolean", "modulus", "variable"];

// Init function for when the page gets loaded.
function init() {
  getWins();
  getLosses();
}

// add a startGame function when the start button is pressed on. Using startButton.disabled prevents start button from being clicked when game is in progress.
function startGame() {
  isWin = false;
  timerCount = 10;
  startButton.disabled = true;
  renderBlanks()
  startTimer()
}

//winGame function called when condition is met
function winGame() {
  wordBlank.textContent = "You have Won! ";
  winCounter++
  startButton.disabled = false;
  setWins();
}

//loseGame function called when condition is met
function loseGame() {
  wordBlank.textContent = "You have Lost! ";
  loseCounter++
  startButton.disabled = false;
  setLosses();

  // setTimer function to start and stop timer. Make it trigger winGame and loseGame functions.
  function startTimer() {
    timer = setInterval(function() {
      timerCount--;
      // condition for win is met
      timerElement.textContent = timerCount;
      if (timerCount >= 0) {
        if (isWin && timerCount > 0) {
          clearInterval(timer);
          winGame();
        }
      }
      // timer test is triggered
      if (timerCount === 0) {
        clearInterval(timer);
        loseGame();
      }
      // 1000 = 10 seconds
    }, 1000);
  }

  // This is for creating blank screen and we want to randomly pick words from word array
  function renderBlanks() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    lettersinChosenWord = chosenWord.split("");
    numBlanks = lettersInChosenWord.length;
    blankLetters = []
  }

  // Now we need to write a loop to push the "blanks" to "blanksLetters" array
  for (var i =0; i< numBlanks; i++) {
    blankLetters.push("_");
    // console.log("ping" + blankLetters);
  }

  // convert blankLetters array into string to render it on the screen
  wordBlank.textContent = blankLetters.join(" ")
}

// We need to update win count on screen and to store it in local
function setWins() {
  win.textContent = winCounter;
  localStorage.setItem("winCount", winCounter);
}

// Do the same thing for lose count

function setLosses() {
  lose.textContent = loseCounter;
  localStorage.setItem("loseCount", loseCounter);
}

// Get stored value from local storage. See if it exists first.
function getWins() {
  var storedWins = localStorage.getItem("winCount");
  // We check to see if stored value exists first, if it doesn't, counter set to 0 
  if (storedWins === null) {
    winCounter = 0;
  } else {
    // If we are able to retrieve from storage, set winCounter to that stored value.
    winCounter = storedWins;
  }
  // Show win count to page
  win.textContent = winCounter;
}

function getLosses() {
  if (storedLosses === null) {
    loseCounter = 0;
  } else {
    loseCounter = storedLosses;
  }
    lose.textContent = loseCounter
}

// We need to see if word equals blankLetters array when converted to string, set isWin to true. First part of timer function/ is used in timer function to see if win condition is met.
function checkWin() {
  if (chosenWord === blankLetters.join(" ") {
    isWin = true;
  }
}

// Test if letters we guess are in the word and renders to screen.
function checkLetters(letter) {
  var letterInWord = false;
  for (var i = 0; i < numBlanks; i++) {
    if (chosenWord[i] === letter) {
      letterInWord = true;
    }
  }
  if(letterInWord) {
    for var f = 0; f < numBlanks; f++) {
      if (chosenWord[f] === letter) {
        blanksLetters[f] = letter;
      }
    }
    wordBlank.textContent = blankLetters.join(" ");
  }
}

// Everything should be complete besides adding event listeners to listen to any key event.
document.addEventListener("keydown", function(event) {
  if (timerCount === 0) {
    return;
  }

// we should convert letters to lower case, then test if key pushed is a letter.
  var key = event.key.toLowerCase();
  var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split(" ");
  if (alphabetNumericCharacters.includes(key)) {
  var letterGuessed = event.key;
    checkLetters(letterGuessed)
    checkWin();
  }
});

// add event listener to start button to call startGame function when we click
startButton.addEventListener("click", startGame);

// We use init so that it runs when page opens
init();

// add reset button

var resetScoreBtn = document.querySelector(".resetScoreBtn");

function resetGame (){
  winCounter = 0;
  loseCounter = 0;
  setWins()
  setLosses()
}

resetScoreBtn.addEventListener("click", resetGame);