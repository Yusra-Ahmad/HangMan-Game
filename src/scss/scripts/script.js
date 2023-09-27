const hangManImages = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessedText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetters , wrongGuessCount;

const maxGuesses =6;

const resetGame = () => {
    correctLetters = [];
     wrongGuessCount = 0;
     hangManImages.src = `images/hangman-${wrongGuessCount}.svg`;
     guessedText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
     keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
     wordDisplay.innerHTML = currentWord.split("").map(() =>  `<li class="letter"></li>`).join("") ;
     gameModal.classList.remove("show")
}

const getRandomWord = () => {

    // Selecting a random word and hint from the wordlist
const {  word , hint }   = wordList[Math.floor(Math.random() * wordList.length)] ;
currentWord = word;

document.querySelector(".hint-text p").innerText = hint;
resetGame();
}

const gameOver = (isVictory) => {
    setTimeout (()   =>    {
// After 600ms of game complete ... showing modal with relvant details
        const modalText = isVictory ? `You found the word:` : `The correct word was`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats' : 'GameOver'}`;
        gameModal.querySelector("p").innerHTML= `${modalText} <b> ${currentWord}<b>`;
gameModal.classList.add("show")
    },    300 );
}

const initGame = (button, clickedLetter) => {

    // Checking if the clicked letter is exists
 if(currentWord.includes(clickedLetter)){
    // sowing all the correct letters on the word display
  [ ...currentWord].forEach((letter, index)  => {
    if(letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed") ;
    }
  })
 }else {
    // IF CLICKED LETTER DOESNOT EXIST THEN UPDATE THE wrongGuessCount and hangman images
  wrongGuessCount++;
  hangManImages.src = `images/hangman-${wrongGuessCount}.svg`;
 }

 button.disabled = true;

 guessedText.innerText = `${wrongGuessCount} / ${maxGuesses}`;


//  calling game over function if any of these conditions meets
 if(wrongGuessCount === maxGuesses) return gameOver(false);
 if(correctLetters.length === currentWord.length) return gameOver(true);
}

//  creating keyboard buttons and adding event listeners
for (let  i = 97;  i < 122; i++) {
const button = document.createElement("button");
button.innerText = String.fromCharCode(i);
   keyboardDiv.appendChild(button); 
   button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)) )
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord );