let randomNumber = Math.floor(Math.random() * 100 + 1);
const guessField = document.querySelector(".guessField");
const guessSubmit = document.querySelector(".guessSubmit");
const resultParas = document.querySelector(".resultParas");
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const body = document.querySelector("body");
const createSpan = document.createElement("span");

guessField.focus();
let guessCount = 1;
let button = document.createElement("button");
let userGuessArray = [];

function checkGuess() {
  let userGuess = Number(guessField.value);

  for (i = 0; i < userGuessArray.length; i++) {
    if (userGuessArray[i] === userGuess) {
      alert("올바른 값을 입력하세요.");
      guessField.focus();
      guessCount = guessCount - 1;
    }
  }

  if (userGuess < 0 || userGuess === 0 || userGuess > 100) {
    alert("올바른 값을 입력하세요.");
    guessField.focus();
    guessCount = guessCount - 1;
  }

  if (guessCount === 1 && userGuess !== 0) {
    guesses.textContent = "Previous guesses: " + userGuess + " ";
  } else if (guessCount > 1 && userGuess !== 0) {
    guesses.textContent += userGuess + " ";
  }

  if (randomNumber === userGuess) {
    lastResult.style.backgroundColor = "green";
    lastResult.textContent = "Congratulation!!! ";
    lowOrHi.textContent = "";
    restartButton();
  } else if (guessCount > 9) {
    setGameOver();
    lastResult.textContent = "졏밥년ㅋ!!";
    deleteSpan();
  } else if (randomNumber !== userGuess && userGuess !== 0) {
    lastResult.style.backgroundColor = "red";
    lastResult.textContent = "Wrong!!";
    guessField.focus();
    if (randomNumber > userGuess) {
      lowOrHi.textContent = "Last guess was low";
    }
    if (randomNumber < userGuess) {
      lowOrHi.textContent = "Last guess was high";
    }
  }
  guessCount++;
  guessField.value = "";
  userGuessArray.push(userGuess);
  userGuessArray = Array.from(new Set(userGuessArray));
  if (userGuess === 0 || userGuess < 0 || userGuess > 100) {
    userGuessArray.pop();
  }
  makeSpan();
}

function makeSpan() {
  createSpan.textContent = `남은 기회 : ${10 - userGuessArray.length}`;
  body.appendChild(createSpan);
}
function deleteSpan() {
  body.removeChild(createSpan);
}

guessSubmit.addEventListener("click", deleteSpan);

function restartButton() {
  button.textContent = "Start new game";
  body.appendChild(button);
  button.addEventListener("click", resetGame);
  guessField.disabled = true;
  guessSubmit.disabled = true;
}

function resetGame() {
  guessCount = 1;
  body.removeChild(button);
  guessField.value = "";
  guessField.focus();

  lastResult.style.backgroundColor = "";
  resetParas();
  guessField.disabled = false;
  guessSubmit.disabled = false;

  randomNumber = Math.floor(Math.random() * 100 + 1);
  userGuessArray = [];
}

function resetParas() {
  const resetParas = resultParas.querySelectorAll("p");
  for (i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = "";
  }
}

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  button.textContent = "Retry";
  body.appendChild(button);
  button.addEventListener("click", resetGame);
  lastResult.textContent = "Game Over";
}

const IMG_NUMBER = 3;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `image/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  document.querySelector("html").appendChild(image);
}

function genRandom() {
  let number = Math.floor(Math.random() * IMG_NUMBER);
  paintImage(number);
  document.querySelector("html").style.color = "white";
}

function init() {
  genRandom();
  guessSubmit.addEventListener("click", checkGuess);
}

init();
