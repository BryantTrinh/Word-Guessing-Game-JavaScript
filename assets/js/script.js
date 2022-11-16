var possibleWords = [
  "variable",
  "function",
  "return",
  "if",
  "else",
  "for",
  "while",
  "do",
  "switch",
  "case",
  "default",
  "try",
  "catch",
  "finally",
  "throw",
  "delete",
  "typeof",
];
var currentWord;
var canType = false;
var lettersGuesed = [];
var didWin = false;
var wordGuessInterval;
var wins = localStorage.getItem("wins") || 0;
var wins = localStorage.getItem("losses") || 0;
var wordBlanks = document.querySelector(".word-blanks");
var winDisplay = document.querySelector(".win");
var loseDisplay = document.querySelector(".lose");

winDisplay.textContent = wins;
loseDisplay.textContent = losses;

function resetScores() {
  wins = 0;
  losses = 0;

  winDisplay.textContent = wins;
  loseDisplay.textContent = losses;

  localStorage.setItem("wins", wins);
  localStorage.setItem("losses", losses);
}  

function initTimer() {
  canType = true;
  var count = 10;
  wordGuessInterval = setInterval(function () {
    count--;
    if (count === 0) {
      clearInterval(wordGuessInterval);
      canType = false;
      if (!didWin) {
        endGame()
      }
    }
    document.querySelector(".timer-count").textContent = count;
  }, 1000);
}

function endGame() {
  if (didWin) {
    wins++;
    localStorage.setItem("wins", wins);
    winDisplay.textContent = wins;
    wordBlanks.textContent = "You HAVE WON!!! ";
  } else {
    losses++;
    localStorage.setItem("losses", losses);
    loseDisplay.textContent = losses;
    wordBlanks.textContent = "You HAVE LOST!!! ";
  }
}

function renderCurrentGuess (letterGuessed) {
  var hasBlanks = false;
  var wordSeparates = currentWord.split("");
  var currentGuess = "";
  for (var i = 0; i <wordSeparates.length; i++) {
    if (wordSeparates[i] === letterGuessed || lettersGuessed.includes(wordSeparates[i])) {
      currentGuess += (wordSeparates[i] + " ");

    } else {
      hasBlanks = true;
      currentGuess += " _ ";
    }
  }

  if (!hasBlanks) {
    didWin = true;
    canType = false;
    clearInterval(wordGuessInterval);
    endGame();
  } else {
    wordBlanks.textContent = currentGuess;
  }
}

document.querySelector(".reset-button").addEventListener("click", function()) {
  resetScores();
})

document.querySelector(".start-button").addEventListener("click", function() {
  lettersGuessed = [];
  didWin = false;
  currentWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
  initTimer();
  renderCurrentGuess(null);
});

document.addEventListener("keydown", function()" {
  if(!canType) {
    return
  }


var letter = event.key.toLowerCase()
var alphabetChars = "abcdefghijklmnopqrstuvwxyz".split("")
if (alphabetChars.includes(letter)) {
  lettersGuessed.push(letter);
  renderCurrentGuess(letter);
}
});