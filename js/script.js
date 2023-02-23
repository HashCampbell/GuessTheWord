const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const guesses = document.querySelector(".remaining");
const remaining = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const hiddenButton = document.querySelector(".play-again hide");

let word = "magnolia";
const lettersGuessed = [];

let remainingGuesses = 8;

const getWord = async function (){
    const resp = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await resp.text();
    const wordArray = data.split("\n");
    const randomWord = Math.floor(Math.random() * wordArray.length);
    
    word = wordArray[randomWord].trim();
    wordsIP(word)
};

const wordsIP = function(word){
    const dotSpot = [];
    for (const l of word){
    // console.log(l);    
    dotSpot.push("●");
}
wordProgress.innerText = dotSpot.join("");
};

getWord();

guessButton.addEventListener("click", function(e){
    e.preventDefault();
    message.innerText = "";
    const aGuess = letterInput.value;
    // console.log(aGuess);
    const goodGuess = validateInput(aGuess);
    //console.log(vi);
    if (goodGuess) {
        makeGuess(aGuess);
    }
    letterInput.value = "";
});


  const validateInput = function (input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.lenght === 0){
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
            console.log(lettersGuessed);
            guessesRemaining(letter);
            displayLetter();
            inProgress(lettersGuessed);
        }

 };

 const displayLetter = function(){
    guessedLetters.innerHTML = " ";
    for (const ltr of lettersGuessed){
    const listItem = document.createElement("li"); 
    listItem.innerText = ltr;
    guessedLetters.append(listItem);  
    }
 };

 const inProgress = function(lettersGuessed){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    // console.log(wordArray);
    const revealWord = [];
    for (const letter of wordArray){
        if (lettersGuessed.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else{
            revealWord.push("●");
        }
    }
    wordProgress.innerHTML = revealWord.join("");
    checkIfWin();
 };

 const guessesRemaining = function (aGuess) {
    const werd = word.toUpperCase();
    if (!werd.includes(aGuess)){
        message.innerText = `Nope! ${aGuess} is not in the word.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Nice work! ${aGuess} is in the word!`;
    }

    if(remainingGuesses === 0){
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        remaining.innerText = `${remainingGuesses} guess`
    } else if (remainingGuesses === 1){
        remaining.innerText = `${remainingGuesses} guess`;
    } else {
        remaining.innerText = `${remainingGuesses} guesses`;
    }
 };

 const checkIfWin = function () {
    if (word.toUpperCase() === wordProgress.innerText) {
      message.classList.add("win");
      message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
  };