//Array of Correct Words user will try to guess
var halloweenArray = [
  {
    word: "cauldron",
    image1: "assets/images/bubble-2022390__340.png",
    image2: "assets/images/cauldron.gif"
  },
  {
    word: "goblin",
    image1: "assets/images/goblin.jpg",
    image2: "assets/images/goblin1.jpg"
  },
  {
    word: "mummy",
    image1: "assets/images/mummy.jpg",
    image2: "assets/images/mummy2.jpg"
  },
  {
    word: "casper",
    image1: "assets/images/casper.jpg",
    image2: "assets/images/casper1.png"
  },
  {
    word: "frankenstein",
    image1: "assets/images/frankenstein.jpg",
    image2: "assets/images/dr.f.jpg"
  },
  {
    word: "costume",
    image1: "assets/images/costumes.png",
    image2: "assets/images/costume1.jpg"
  },
  {
    word: "michael meyers",
    image1: "assets/images/mm1.jpg",
    image2: "assets/images/mm.jpg"
  },
  {
    word: "werewolf",
    image1: "assets/images/ww.jpg",
    image2: "assets/images/ww1.jpg"
  },
  {
    word: "dracula",
    image1: "assets/images/drac1.jpg",
    image2: "assets/images/drac2.jpg"
  },
  {
    word: "zombie",
    image1: "assets/images/zombie.png",
    image2: "assets/images/zombie1.jpg"
  },
  {
    word: "scarecrow",
    image1: "assets/images/sc.jpg",
    image2: "assets/images/sc1.jpg"
  },
  {
    word: "freddy kruger",
    image1: "assets/images/fk.jpg",
    image2: "assets/images/fk1.jpg"
  }
];

//gameStatus = start or stop between questions
var gameStatus = false;

//Generate randomNumber
var randomNumber = Math.floor(Math.random() * halloweenArray.length);

//Apply randomNumber to obtain random word (answer), and related image
var halloween = halloweenArray[randomNumber].word;
var halloImage1 = halloweenArray[randomNumber].image1;
var halloImage2 = halloweenArray[randomNumber].image2;

// lettersRemaining (for win);
var lettersRemaining = halloween.length;

// answer array stores answer as an array
var answerArray = [];

//key events to listen for the letters that players will type
document.addEventListener("keyup", function(event) {
  //If gameStatus (or game round) has been initialized, then proceed to playing
  if (gameStatus) {
    letterCheck(event);
  } else {
    //If gameStatus (or game round) has completed, re-initialize (or reset) the game
    init();
  }
});

//Setup alphabet array for letter checking
var alphabetArray = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];

function letterCheck(guess) {
  //If letter key is pressed, check if the letter pressed is in the answer
  if (alphabetArray.indexOf(guess.key) > -1) {
    correctGuessCheck(guess);
  }
}

//Check whether the guess is correct
var winScore = 0;
function correctGuessCheck(guess) {
  if (halloween.indexOf(guess.key) > -1) {
    //If guess is correct, run correctGuess function
    correctGuess(guess);
  } else {
    //If guess is incorrect, run incorrectGuess function
    incorrectGuess(guess);
  }
}

function correctGuess(guess) {
  if (answerArray.indexOf(guess.key.toUpperCase()) < 0) {
    //If the correctGuess doesn't exist in the answerArray, run addCorrectLetter function
    addCorrectLetter(guess);
  }
}

function addCorrectLetter(guess) {
  for (var j = 0; j < halloween.length; j++) {
    //If guess matches an existing letter in the answer
    if (guess.key === halloween[j]) {
      //Push correct letter to answerArray as upperCase
      answerArray[j] = guess.key.toUpperCase();
      displayCurrentWord();
      //Reduce letters remaining for win by one
      lettersRemaining--;
      //If letters left has reached 0, user wins
      if (lettersRemaining === 0) {
        //Add 1 to win score
        winScore++;
        //Display new win score
        displayWins();
        //Reveal the correct word's image
        changeImage();
        //Turn correct answer green
        addCorrect();
        //display currentWord with new green font
        displayCurrentWord();
      }
    }
  }
}

//Set up an incorrect answer array
var incorrectGuessesMade = [];
//Establish the number of guesses
var guessesLeft = 9;

function incorrectGuess(guess) {
  if (incorrectGuessesMade.indexOf(guess.key.toUpperCase()) < 0) {
    //If the inCorrectGuess doesn't exist in the answerArray, run addIncorrectLetter function.
    addIncorrectLetter(guess);
  }
}

function addIncorrectLetter(guess) {
  //Push incorrect guess into the incorrectGuessesMade array
  incorrectGuessesMade.push(guess.key.toUpperCase());
  //Inform user of incorrectGuessesMade
  displayGuessesMade();
  //Lower guessesLeft by 1
  guessesLeft--;
  //Inform user of guessesLeft
  displayGuessesLeft();
  if (guessesLeft === 0) {
    //If guesses left reaches equals 0, then Game Over
    changeImage();
    //Display corrent answer
    displayAnswer();
  }
}

//Displays the number of wins user has obtains
function displayWins() {
  var winsDisplay = document.querySelector("#winsDisplay");
  winsDisplay.textContent = winScore;
}

//Displays the letters the user has guessed
function displayGuessesMade() {
  var guessesMadeDisplay = document.querySelector("#guessesMadeDisplay");
  guessesMadeDisplay.textContent = incorrectGuessesMade.join(", ");
}

//Displays how many user guesses are left
function displayGuessesLeft() {
  var guessesLeftDisplay = document.querySelector("#guessesLeftDisplay");
  guessesLeftDisplay.textContent = guessesLeft;
}

//Displays current solve status of answerArray
function displayCurrentWord() {
  var currentWordDisplay = document.querySelector("#currentWordDisplay");
  currentWordDisplay.innerHTML = answerArray.join(" ");
}

//Displays picture when game initalizes
function displayImage() {
  var pictureDisplay = document.querySelector("#pictureDisplay");
  pictureDisplay.src = halloImage1;
}

//Reveals correct pic regardless of whether user was able to solve
function changeImage() {
  var pictureDisplay = document.querySelector("#pictureDisplay");
  pictureDisplay.src = halloImage2;
  gameStatus = false;
}

//Reveals answer if user is unable to solve.
function displayAnswer() {
  var revealedAnswerDisplay = document.querySelector("#revealedAnswerDisplay");
  revealedAnswerDisplay.textContent = halloween.toUpperCase();
}

//Turns current word green (to indicate if correct)
function addCorrect() {
  var currentWordDisplay = document.querySelector("#currentWordDisplay");
  currentWordDisplay.classList.add("correct");
}

//Removes green color of current word
function removeCorrect() {
  var currentWordDisplay = document.querySelector("#currentWordDisplay");
  currentWordDisplay.classList.remove("correct");
}

function init() {
  //Changes gameStatus to ready.
  gameStatus = true;

  //Generate a new random number
  randomNumber = Math.floor(Math.random() * halloweenArray.length);

  //Apply new randomNumber to obtain random word (answer), and related images.
  halloween = halloweenArray[randomNumber].word;
  halloImage1 = halloweenArray[randomNumber].image1;
  halloImage2 = halloweenArray[randomNumber].image2;

  //Re-establish lettersRemaining (for win)
  lettersRemaining = halloween.length;

  //Re-establish answer array
  answerArray = [];

  //Convert word answer into an array
  for (var i = 0; i < halloween.length; i++) {
    //If an answer has more than one word, use + as a separator. A space will be displayed when currentWord is displayed. Not applicable for this game, but here for flexibility.
    if (halloween[i] === "+") {
      answerArray[i] = "&nbsp;";
    } else {
      //Replace word answer with "_"s
      answerArray[i] = "_";
    }
  }

  //Re-establish lettersRemaining (for win)
  lettersRemaining = halloween.length;

  //Re-establish guessesLeft for user
  guessesLeft = 9;
  displayGuessesLeft();

  //Re-establish guessesMade array
  incorrectGuessesMade = [];
  displayGuessesMade();

  //Display current word
  displayCurrentWord();

  //Display picture
  displayImage();

  //Empty revealedAnswer display if user was unsuccessful previously
  revealedAnswerDisplay.textContent = "";

  //Remove greenColor from currentWord if user was successful previously
  removeCorrect();
}
