const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const guesses = document.querySelector(".remaining");
const remaining = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const hiddenButton = document.querySelector(".play-again hide");
const word = "magnolia";

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
    const aGuess = letterInput.value;
    console.log(aGuess);
    letterInput.value = "";
});

// const clearInput = function () {
//     letterInput.value = "";
//   };