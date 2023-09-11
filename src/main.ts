import "./style.css";

import { game, Cards } from "./model";

import { addingScore, adjustValue, assignScore, randomNumber } from "./motor";

// UI INTERFACE FUNCTIONS

// PLAYING GAME*****************************************************************

//showing random card
const getImgCard = (cardValue: number): string => {
  return cardValue !== 0
    ? `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/${cardValue}_${Cards[cardValue]}-copas.jpg`
    : "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
};

const showCard = (urlCard: string) => {
  const imgElement = document.getElementById("newCard");
  if (imgElement && imgElement instanceof HTMLImageElement) {
    imgElement.src = urlCard;
  } else {
    throw new Error("imgElement not found");
  }
};

//updating score
const showScore = () => {
  const scoreElement = document.getElementById("score");
  if (scoreElement && scoreElement instanceof HTMLHeadingElement) {
    scoreElement.textContent = game.userScore.toString().padStart(2, "0");
  } else {
    throw new Error("HeadingElement not found");
  }
};

//asking for another card
const askAnotherCard = () => {
  const randomValue = randomNumber();
  const cardNumber = adjustValue(randomValue);
  const imageCard = getImgCard(cardNumber);
  showCard(imageCard);
  const cardScore = assignScore(cardNumber);
  addingScore(cardScore);
  showScore();
  checkingStatus();
};

// GAME STATUS*********************************************************************

// checking game status
const checkingStatus = () => {
  if (game.userScore < game.maxScore) {
    keepPlaying();
  } else if (game.userScore === game.maxScore) {
    winGame();
  } else {
    gameOver();
  }
};

//status text
const getStatusMessage = (score: number): string => {
  if (score < game.maxScore) {
    return "¡Sigue jugando!";
  } else if (score === game.maxScore) {
    return "¡Lo has clavado!¡Enhorabuena!";
  } else if (score > game.maxScore) {
    return "¡GAME OVER!";
  } else {
    return "";
  }
};
// showing status message
const showMessage = (text: string) => {
  const statusTextElement = document.getElementById("status");
  if (statusTextElement && statusTextElement instanceof HTMLParagraphElement) {
    statusTextElement.textContent = text;
  } else {
    throw new Error("ParagraphElement not found");
  }
};

//keep playing message
const keepPlaying = () => {
  const message = getStatusMessage(game.userScore);
  showMessage(message);
};

//winning - FUNCTION
const winGame = () => {
  const message = getStatusMessage(game.userScore);
  showMessage(message);
  disableButton();
  activateNewGame();
};

//game over - FUNCTION
const gameOver = () => {
  const message = getStatusMessage(game.userScore);
  showMessage(message);
  disableButton();
  activateNewGame();
};

// RESIGN*************************************************************************

//resign text
const getResignMessage = (score: number): string => {
  if (score <= 4) {
    return "¡Has sido muy conservador!";
  } else if (score > 4 && score <= 5) {
    return "¡Te ha entrado el canguelo eh!";
  } else if (score > 5 && score < 7.5) {
    return "¡Uyyy!¡Casi casi!";
  } else {
    return "";
  }
};

//resigning - FUNCTION
const resign = () => {
  hiddingStatusText();
  const message = getResignMessage(game.userScore);
  showMessage(message);
  disableButton();
  activateNewGame();
  activateFutureCardButton();
};

const hiddingStatusText = () => {
  const statusText = document.getElementById("status");
  if (statusText && statusText instanceof HTMLParagraphElement) {
    statusText.textContent = "";
  } else {
    throw new Error("statusText not found");
  }
};

// NEW GAME***********************************************************************

// NEW GAME - FUNCTION
const newGame = () => {
  game.userScore = 0;
  showScore();
  activateButton();
  hiddingStatusText();
  const imageCard = getImgCard(0);
  showCard(imageCard);
  disableFutureButton();
};

// CHECKIN FUTURE STATUS*********************************************************

//future - status message
const getFutureMessageForScore = (score: number): string => {
  if (score > game.maxScore) {
    return "¡Has hecho bien!¡Habrías perdido!";
  } else if (score === game.maxScore) {
    return "¡Qué pena!¡Habrías ganado!";
  } else if (score < game.maxScore) {
    return "¡Qué pena!¡Estarías más cerca!";
  } else {
    return "";
  }
};

const futureCard = () => {
  hiddingStatusText();
  const randomValue = randomNumber();
  const cardNumber = adjustValue(randomValue);
  const imageCard = getImgCard(cardNumber);
  showCard(imageCard);
  const cardScore = assignScore(cardNumber);
  addingScore(cardScore);
  showScore();
  const message = getFutureMessageForScore(game.userScore);
  showMessage(message);
  disableFutureButton();
};

// EVENTS AND BUTTONS FUNCTIONS**************************************************
//BUTTONS - ADDEVENTLISTENERS
const events = () => {
  //asking for another card - BUTTON
  const btnAskCard = document.getElementById("askAnotherCard");
  if (btnAskCard && btnAskCard instanceof HTMLButtonElement) {
    btnAskCard.addEventListener("click", askAnotherCard);
  } else {
    throw new Error("ButtonElement not found");
  }
  //resigning - BUTTON
  const btnResign = document.getElementById("btnResign");
  if (btnResign && btnResign instanceof HTMLButtonElement) {
    btnResign.addEventListener("click", resign);
  } else {
    throw new Error("ButtonElement not found");
  }
  // NEW GAME - BUTTON
  const btnNewGame = document.getElementById("btnNewGame");
  if (btnNewGame && btnNewGame instanceof HTMLButtonElement) {
    btnNewGame.addEventListener("click", newGame);
  } else {
    throw new Error("ButtonElement not found");
  }
  // LAST CARD FUTURE - BUTTON
  const btnFutureCard = document.getElementById("btnFutureCard");
  if (btnFutureCard && btnFutureCard instanceof HTMLButtonElement) {
    btnFutureCard.addEventListener("click", futureCard);
  } else {
    throw new Error("ButtonElement not found");
  }
};

//disabling buttons
const disableButton = () => {
  const btnAskCard = document.getElementById("askAnotherCard");
  if (btnAskCard && btnAskCard instanceof HTMLButtonElement) {
    btnAskCard.disabled = true;
  } else {
    throw new Error("ButtonElement not found");
  }
  const btnResign = document.getElementById("btnResign");
  if (btnResign && btnResign instanceof HTMLButtonElement) {
    btnResign.disabled = true;
  } else {
    throw new Error("ButtonElement not found");
  }
};
const disableFutureButton = () => {
  const btnFutureCard = document.getElementById("btnFutureCard");
  if (btnFutureCard && btnFutureCard instanceof HTMLButtonElement) {
    btnFutureCard.style.display = "none";
  } else {
    throw new Error("ButtonElement not found");
  }
};
//activating buttons
const activateButton = () => {
  const btnAskCard = document.getElementById("askAnotherCard");
  if (btnAskCard && btnAskCard instanceof HTMLButtonElement) {
    btnAskCard.disabled = false;
  } else {
    throw new Error("ButtonElement not found");
  }
  const btnResign = document.getElementById("btnResign");
  if (btnResign && btnResign instanceof HTMLButtonElement) {
    btnResign.disabled = false;
  } else {
    throw new Error("ButtonElement not found");
  }
  const btnNewGame = document.getElementById("btnNewGame");
  if (btnNewGame && btnNewGame instanceof HTMLButtonElement) {
    btnNewGame.style.display = "none";
  } else {
    throw new Error("ButtonElement not found");
  }
};
const activateNewGame = () => {
  const btnNewGame = document.getElementById("btnNewGame");
  if (btnNewGame && btnNewGame instanceof HTMLButtonElement) {
    btnNewGame.style.display = "block";
  }
};
const activateFutureCardButton = () => {
  const btnFutureCard = document.getElementById("btnFutureCard");
  if (btnFutureCard && btnFutureCard instanceof HTMLButtonElement) {
    btnFutureCard.style.display = "block";
  } else {
    throw new Error("ButtonElement not found");
  }
};

// DOMContentLoaded + Events*****************************************************
document.addEventListener("DOMContentLoaded", function () {
  showScore();
  events();
});
