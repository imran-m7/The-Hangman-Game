// random 100 words that could be guessed
const allWords = [
    "apple", "banana", "mango", "orange", "lemon", "pineapple", "watermelon", "grape", "cherry", "papaya",
    "carrot", "potato", "tomato", "cucumber", "broccoli", "spinach", "eggplant", "kale", "lettuce", "pea",
    "tesla", "ferrari", "lamborghini", "porsche", "mercedes", "bmw", "audi", "ford", "toyota", "honda",
    "red", "blue", "green", "yellow", "purple", "orange", "pink", "black", "white", "gray",
    "tiger", "lion", "elephant", "giraffe", "dolphin", "kangaroo", "panda", "zebra", "fox", "wolf",
    "chair", "table", "phone", "laptop", "camera", "bottle", "clock", "mirror", "pencil", "notebook",
    "doctor", "engineer", "teacher", "farmer", "artist", "lawyer", "chef", "pilot", "nurse", "writer",
    "canada", "brazil", "japan", "germany", "australia", "france", "india", "china", "italy", "mexico",
    "river", "mountain", "forest", "ocean", "desert", "rainbow", "thunder", "snow", "breeze", "sunrise",
    "soccer", "basketball", "cricket", "tennis", "baseball", "golf", "hockey", "swimming", "boxing", "running" 
];

// hangman display incorrect guesses (6 parts: head, body, left arm, right arm, left leg, right leg)
const hangmanDisplayStages = [
  `
   -----
   |   |
       |
       |
       |
       |
  ---------`, 
  `
   -----
   |   |
   O   |
       |
       |
       |
  ---------`, 
  `
   -----
   |   |
   O   |
   |   |
       |
       |
  ---------`, 
  `
   -----
   |   |
   O   |
  /|   |
       |
       |
  ---------`, 
  `
   -----
   |   |
   O   |
  /|\\  |
       |
       |
  ---------`, 
  `
   -----
   |   |
   O   |
  /|\\  |
  /    |
       |
  ---------`, 
  `
   -----
   |   |
   O   |
  /|\\  |
  / \\  |
       |
  ---------`
];

// displaying the hangman figure based on remaining guesses
function displayHangmanParts() {
  console.log(hangmanDisplayStages[6 - guesses]); 
}

// number of guesses
let guesses = 6; 

// selecting a random word from the array
const randomWord = allWords[Math.floor(Math.random() * allWords.length)];

// hidden word (randomWord) that needs to be guessed
let hiddenWord = "_".repeat(randomWord.length).split("");
  
console.log("Welcome to The Hangman Game!");
console.log(`You have ${guesses} chances to guess the correct word.`);
console.log(`Word to guess: ${hiddenWord.join(" ")}`);
  
// creating connection between user input and terminal output
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});
  

function startingGame() {
  if (guesses > 0 && hiddenWord.includes("_")) {
    readline.question("Guess a letter or the whole word: ", function(guess) {
      // converting users guess to lower letters (case sensitive)
      guess = guess.toLowerCase();
      
      // guessing a letter
      if (guess.length === 1) {
        // if correct letter
        if (randomWord.includes(guess)) {
          for (let i = 0; i < randomWord.length; i++) {
            if (randomWord[i] === guess) {
              hiddenWord[i] = guess;
            }
          }
          console.log("You guessed correct letter!");
        }
        // if incorrect letter
        else {
          guesses--;
          console.log(`You guessed wrong letter. You have ${guesses} guesses left.`);
          displayHangmanParts();
        }
      } 

      // guessing whole hidden word (correct)
      else if (guess === randomWord) {
        hiddenWord = randomWord.split("");
        console.log("You guessed the whole word!");
      } 
      
      // guessing whole hidden word (incorrect)
      else {
        guesses--;
        console.log(`Wrong word. You have ${guesses} guesses left.`);
        displayHangmanParts();
      }
      
      // representing the hidden word again then calling the function recursively
      console.log(`Word to guess: ${hiddenWord.join(" ")}`);
      startingGame();
    });
  }

  // if there are no more guesses or the word does not have "_"
  else {
    // lost
    if (hiddenWord.includes("_")) {
      console.log(`Game over! The word was: ${randomWord}`);
      displayHangmanParts();
    }

    // won by last letter guess or by whole word (since there are no more guesses remaining)
    else {
      console.log("Congratulations, you won!");
    }

    // closing readline interface
    readline.close();
  }
}

// calling the function (starting the game)
startingGame();