//alert("running external JS code!");

//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess); 
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

//Global variables
let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;

//Initialize the game
initializeGame();

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("Random Number: " +  randomNumber);
    attempts = 0;

    //hiding the Reset button
    document.querySelector("#resetBtn").style.display = "none";

    //showing the Guess button
    document.querySelector("#guessBtn").style.display = "inline";

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus(); //adding focus to textbox
    playerGuess.value = ""; //clearing the textbox

    let feedback = document.querySelector("#feedback");
    feedback.textContent = ""; //clearing the feedback

    //clearing previous guesses
    document.querySelector("#guesses").textContent = "";

    //attempts left
    updateAttemptsLeft();

    //updating wins and losses
    updateScore();
}


function checkGuess() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);
    if (guess < 1 || guess > 99) {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }
    attempts++;
    console.log("Attempts: " + attempts);
    updateAttemptsLeft();
    feedback.style.color = "purple";
    if (guess == randomNumber) {
        feedback.textContent = "You guessed it! You Won!";
        feedback.style.color = "green";
        wins++;
        gameOver();
    } else {
        document.querySelector("#guesses").textContent += guess + " ";
        if (attempts == 7) {
            feedback.textContent = "Sorry, you lost! The number was " + randomNumber;
            feedback.style.color = "red";
            losses++;
            gameOver();
        } else if (guess > randomNumber) {
                feedback.textContent = "Guess was high";
        } else {
                feedback.textContent = "Guess was low";
        }
    }
}

function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none"; //hide Guess button
    resetBtn.style.display = "inline"; //show Reset button

    updateScore();
}

function updateAttemptsLeft() {
    let attemptsLeft = 7 - attempts;
    document.querySelector("#attemptsLeft").textContent = "Attempts left: " + attemptsLeft;
}

function updateScore() {
    const displayWins = document.querySelector("#wins");
    const displayLosses = document.querySelector("#losses");
    displayWins.textContent = "Wins: " + wins;
    displayLosses.textContent = "Losses: " + losses;
}
//document.querySelector("h1").style.color = "red";
//document.querySelector("h2").style.color = "blue";