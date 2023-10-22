const gameModal = document.querySelector(".game-modal");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const playBoard = document.querySelector(".play-board");

let gameOver = false;
let foodX, foodY;
let snakeX = 10, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
var score = 0;
var speed = 210;

// Getting high score from the local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `${highScore}`;

const changeFoodPosition = () => {
    // Passing a random 0 - 30 value as food position
    foodX = Math.floor(Math.random() * 50) + 1;
    foodY = Math.floor(Math.random() * 50) + 1;

    foodX2 = Math.floor(Math.random() * 30) + 1;
    foodY2 = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    // Clearing the timer and reloading the page on game over
    clearInterval(setIntervalId)
    alert("Game Over! Press OK to replay...");
    location.reload();
}

const changeDirection = (e) => {
    // Changing velocity value based on key press
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

const getSpeed = () => {
    // Adjust the speed based on the score
    speed = speed - 5;

    // Clear the existing interval
    clearInterval(setIntervalId);
    // Set a new interval with the updated speed
    setIntervalId = setInterval(initGame, speed);
    return speed;
}

const initGame = () => {
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    htmlMarkup += `<div class="food" style="grid-area: ${foodY2} / ${foodX2}"></div>`;


    // checking if the snake hit the food
    if(snakeX === foodX && snakeY === foodY || snakeX === foodX2 && snakeY === foodY2) {
        changeFoodPosition();
        getSpeed();
        snakeBody.push([foodX, foodY]); // Pushing food position to snake body array
        score++; // increment score by 1

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `${score}`;
        highScoreElement.innerHTML = `${highScore}`;
        // console.log(speed);
        // Remove the "animate" class to reset the animation
        gameModal.classList.remove('animate');

        // Trigger reflow (force a reflow) to reapply the animation
        void gameModal.offsetWidth;

        // Add the "animate" class back to trigger the animation again
        gameModal.classList.add('animate');
        
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        // Shifting forward the values of the elements in the snake body by one
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY]; // Setting first element of snake body to current snake position

    // Updating the snake's head position based on the current velocity
    snakeX += velocityX;
    snakeY += velocityY;

    // Checking if the snake's head is out of wall, if so setting gameOver to true
    if(snakeX <= 0 || snakeX > 50 || snakeY <= 0 || snakeY > 50) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        // Adding a div for each part of the snake's body
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        // Check if the snake head hit the body, if so set gameOver to true
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }
    playBoard.innerHTML = htmlMarkup; // Corrected property name
}

changeFoodPosition();
getSpeed();
setIntervalId = setInterval(initGame,getSpeed());
document.addEventListener("keydown", changeDirection);