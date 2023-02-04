const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const guesses = document.querySelector(".remaining");
const remaining = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const hiddenButton = document.querySelector(".play-again hide");
const word = "magnolia";
const lettersGuessed = [];

const wordsIP = function(word){
    const dotSpot = [];
    for (let l of word){
    dotSpot.push("●");
}
wordProgress.innerText = dotSpot.join("");
};

wordsIP(word);

guessButton.addEventListener("click", function(e){
    e.preventDefault();
    message.innerText = "";
    const aGuess = letterInput.value;
    console.log(aGuess);
    const vi = validateInput(aGuess);
    console.log(vi);
    makeGuess(aGuess);
    clearInput();
});

const clearInput = function () {
     letterInput.value = "";
  };

  const validateInput = function (input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input === 0){
        message.innerText = "Please eneter a letter from A to Z";
    } else if (input.length > 1){
        message.innerText = "You can only guess one letter at a time";
    }
    else if (!input.match(acceptedLetter)){
        message.innerText = "Please eneter a letter from A to Z";
    } else{
        return input;
    };
  };

 const makeGuess = function(letter) {
    letter = letter.toUpperCase();
        if (lettersGuessed.includes(letter)) {
        message.innerText = "You tried that already. Guess Again!";  
        } else {
            lettersGuessed.push(letter);
        }
    console.log(lettersGuessed);
 };