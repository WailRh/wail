// Chalenge1: your age in days

function ageInDays() {
  var birthYear = prompt("Type your birth year:");
  let currentYear = new Date().getFullYear();
  let result = (currentYear - birthYear) * 365;
  var node = document.createElement("h4");
  var textAnswer = document.createTextNode("You are " + result + " days old.");
  node.setAttribute("id", "ageindays");
  node.appendChild(textAnswer);
  document.getElementById("result").appendChild(node);
}

function reset() {
  document.getElementById("ageindays").remove();
}

// Chalenge2: Cat generator

let i = 0;
let idn = "cat" + i;
function catGenerator() {
  var image = document.createElement("img");
  image.src =
    "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
  i++;
  idn = "cat" + i;
  image.setAttribute("id", idn);
  document.getElementById("catgen").appendChild(image);
}

function catRemove() {
  if (i >= 1) {
    document.getElementById(idn).remove();
    i--;
    idn = "cat" + i;
  }
}

// Chalenge3: Rock Paper Scissors

function rpsGame(yourChoice) {
  var humanChoice = yourChoice.id;
  var botChoice = numToChoice(getRandomInt(3));

  var msg = finalMessage(compare(humanChoice, botChoice));
  rpsInterface(humanChoice, botChoice, msg);
}

// Random bot Choice
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function numToChoice(num) {
  var choices = ["rock", "paper", "scissors"];
  return choices[num];
}

// comparison between human and bot choices
function compare(humanChoice, botChoice) {
  var rpsDatabase = {
    rock: {
      rock: 0.5,
      paper: 0,
      scissors: 1,
    },
    paper: {
      rock: 1,
      paper: 0.5,
      scissors: 0,
    },
    scissors: {
      rock: 0,
      paper: 1,
      scissors: 0.5,
    },
  };
  return rpsDatabase[humanChoice][botChoice];
}

// message and it's color
function finalMessage(number) {
  if (number === 0) return ["You Lost!", "red"];
  else if (number === 0.5) return ["You Tied!", "yellow"];
  else return ["You Won!", "green"];
}

// DOM
function rpsInterface(humanChoice, botChoice, msg) {
  let imgHuman = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src,
  };
  let imgBot = {
    rock: "./images/rock-left.png",
    paper: "./images/paper.png",
    scissors: "./images/scissors-left.png",
  };

  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();

  var divHuman = document.createElement("div");
  divHuman.setAttribute("id", "left");
  var divBot = document.createElement("div");
  divBot.setAttribute("id", "right");
  var divMessage = document.createElement("div");

  divHuman.innerHTML =
    "<img src= '" +
    imgHuman[humanChoice] +
    "' style='width:21%;box-shadow: 0 10px 50px rgba(37, 50, 233, 1);'>";
  divBot.innerHTML =
    "<img src= '" +
    imgBot[botChoice] +
    "' style='width:21%;box-shadow: 0 10px 50px rgb(233, 37, 37);'>";

  divMessage.innerHTML =
    "<h1 style='color: " + msg[1] + " ;padding: .2em;'>" + msg[0] + "</h1>";
  document.getElementById("interface").appendChild(divHuman);
  document.getElementById("interface").appendChild(divMessage);
  document.getElementById("interface").appendChild(divBot);
}

// Chalenge4: Change the color of all buttons

var all_buttons = document.getElementsByTagName("button");
var copy_all_buttons = [];

for (let i = 0; i < all_buttons.length; i++) {
  copy_all_buttons.push(all_buttons[i].classList[1]);
}

function colorChange(button) {
  if (button.value === "red") toRed();
  else if (button.value === "green") toGreen();
  else if (button.value === "reset") resetColors();
  else toRandom();
}

function toRed() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-danger");
  }
}
function toGreen() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-success");
  }
}
function resetColors() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copy_all_buttons[i]);
  }
}
function toRandom() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copy_all_buttons[getRandomInt(4)]);
  }
}

// Chalenge5: Blackjack
let blackjackGame = {
  you: {
    scoreSpan: "#your-blackjack-result",
    div: "#your-box",
    score: 0,
  },

  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0,
  },

  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],

  cardsMap: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 10,
    Q: 10,
    K: 10,
    A: [1, 11],
  },

  wins: 0,
  losses: 0,
  draws: 0,

  onStand: false,
  turnOver: true,
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];
const CARDS = blackjackGame["cards"];

const hitSound = new Audio("./sounds/swish.m4a");
const winSound = new Audio("./sounds/cash.mp3");
const lossSound = new Audio("./sounds/aww.mp3");

document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackjackHit);

document
  .querySelector("#blackjack-stand-button")
  .addEventListener("click", blackjackStand);

document
  .querySelector("#blackjack-deal-button")
  .addEventListener("click", balckjackDeal);

function blackjackHit() {
  if (!blackjackGame["onStand"]) {
    blackjackGame["turnOver"] = false;
    let card = randomCard();

    showCard(YOU, card);
    updateScore(YOU, card);
    showScore(YOU);
  }
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function blackjackStand() {
  if (!blackjackGame["turnOver"]) {
    blackjackGame["onStand"] = true;

    while (DEALER["score"] <= 15) {
      let card = randomCard();

      showCard(DEALER, card);
      updateScore(DEALER, card);
      showScore(DEALER);

      await sleep(500);
    }

    blackjackGame["turnOver"] = true;
    showResult(computeWinner());
  }
}

function balckjackDeal() {
  if (blackjackGame["turnOver"]) {
    let cardImages = document

      .querySelector(".flex-blackjack-row-1")
      .querySelectorAll("img");

    for (let i = 0; i < cardImages.length; i++) {
      cardImages[i].remove();
    }

    YOU["score"] = 0;
    DEALER["score"] = 0;

    document.querySelector("#your-blackjack-result").textContent = 0;
    document.querySelector("#dealer-blackjack-result").textContent = 0;

    document.querySelector("#your-blackjack-result").style.color = "white";
    document.querySelector("#dealer-blackjack-result").style.color = "white";

    document.querySelector("#blackjack-result").textContent = "Let's play";
    document.querySelector("#blackjack-result").style.color = "black";

    blackjackGame["onStand"] = false;
  }
}

function showCard(currentPlayer, card) {
  if (currentPlayer["score"] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `./images/${card}.png`;
    document.querySelector(currentPlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
}

function randomCard() {
  let randomIndex = getRandomInt(13);
  return CARDS[randomIndex];
}

function updateScore(currentPlayer, card) {
  if (card === "A") {
    // if adding 11 keeps me below 21, add 11. otherwise add 1
    if (currentPlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21)
      currentPlayer["score"] += blackjackGame["cardsMap"][card][1];
    else currentPlayer["score"] += blackjackGame["cardsMap"][card][0];
  } else currentPlayer["score"] += blackjackGame["cardsMap"][card];
}
function showScore(currentPlayer) {
  if (currentPlayer["score"] > 21) {
    document.querySelector(currentPlayer["scoreSpan"]).textContent = "BUST!";
    document.querySelector(currentPlayer["scoreSpan"]).style.color = "red";
  } else
    document.querySelector(currentPlayer["scoreSpan"]).textContent =
      currentPlayer["score"];
}

function computeWinner() {
  let winner;

  let sy = YOU["score"];
  let sd = DEALER["score"];

  if (sy <= 21 && sd <= 21) {
    if (sy > sd) {
      winner = YOU;
      blackjackGame["wins"]++;
    } else if (sy < sd) {
      winner = DEALER;
      blackjackGame["losses"]++;
    } else {
      blackjackGame["draws"]++;
    }
  } else if (sy <= 21 && sd > 21) {
    winner = YOU;
    blackjackGame["wins"]++;
  } else if (sy > 21 && sd <= 21) {
    winner = DEALER;
    blackjackGame["losses"]++;
  } else if (sy > 21 && sd > 21) {
    blackjackGame["draws"]++;
  }

  return winner;
}

function showResult(winner) {
  let message, messageColor;

  if (winner === YOU) {
    message = "You Won!";
    messageColor = "green";

    winSound.play();

    document.querySelector("#wins").textContent = blackjackGame["wins"];
  } else if (winner === DEALER) {
    message = "You Lost!";
    messageColor = "red";

    lossSound.play();

    document.querySelector("#losses").textContent = blackjackGame["losses"];
  } else {
    message = "You Drew!";
    messageColor = "black";

    document.querySelector("#draws").textContent = blackjackGame["draws"];
  }

  document.querySelector("#blackjack-result").textContent = message;
  document.querySelector("#blackjack-result").style.color = messageColor;
}
