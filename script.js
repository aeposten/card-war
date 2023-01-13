const newDeckBtn = document.getElementById("deck-btn");
const drawButton = document.getElementById("draw-card-btn");
const cardsEl = document.getElementById("player-cards");
const winnerEl = document.getElementById("winner");
const remainingEl = document.getElementById("remaining-cards");

let deckId;
let playerCards;

newDeckBtn.addEventListener("click", fetchDeck);
drawButton.addEventListener("click", drawCards);

function fetchDeck() {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
    .then((response) => response.json())
    .then((data) => {
      deckId = data.deck_id;
      localStorage.setItem("deckId", deckId);
      renderRemainingCards(data);
    });
}

function drawCards() {
  fetch(
    `https://deckofcardsapi.com/api/deck/${localStorage.getItem(
      "deckId"
    )}/draw/?count=2`
  )
    .then((response) => response.json())
    .then((data) => {
      playerCards = data.cards;
      renderRemainingCards(data);
      renderCards(playerCards);
      renderWinnerMessage();
    });
}

function renderCards(cardsArray) {
  cardsEl.innerHTML = cardsArray
    .map(
      ({ image, value, suit }, index) => `
        <div class="player-${index + 1}">
        <h3>${index === 0 ? "Computer" : "You"}</h3>
        <img class="card-img" src=${image}  alt="${value} of ${suit}"/>
        </div>
    `
    )
    .join("");
}

function renderRemainingCards(deckData) {
  if (deckData.remaining === 0) {
    drawButton.disabled = true;
    drawButton.classList.add("disabled");
  } else {
    drawButton.disabled = false;
    drawButton.classList.remove("disabled");
  }
  remainingEl.textContent = `Cards Remaining: ${deckData.remaining}`;
}

function renderWinnerMessage() {
  winnerEl.textContent = determineWinnerMessage(playerCards);
}

function determineWinnerMessage(cards) {
  let card1 = cards[0].value;
  const card1Value = determineCardValue(card1);
  let card2 = cards[1].value;
  const card2Value = determineCardValue(card2);
  let winnerMessage = "";

  if (card1Value > card2Value) {
    winnerMessage = "Computer Wins!";
  } else if (card2Value > card1Value) {
    winnerMessage = "You Win!";
  } else {
    winnerMessage = "War!";
  }

  return winnerMessage;
}

function determineCardValue(card) {
  let cardValue;

  const cardsArray = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];

  for (let i = 0; i < cardsArray.length; i++) {
    if (cardsArray[i] === card) {
      cardValue = i;
      break;
    }
  }
  return cardValue;
}
