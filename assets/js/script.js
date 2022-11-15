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
    }, 1000);
  }
