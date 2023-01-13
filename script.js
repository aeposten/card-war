const newDeckBtn = selectComponent("deck-btn");
const drawButton = selectComponent("draw-card-btn");
const cardsEl = selectComponent("player-cards");

let deckId;
let playerCards;
let players = [];

function selectComponent(elementId) {
  let component = document.getElementById(elementId);
  return component;
}

newDeckBtn.addEventListener("click", fetchDeck);
drawButton.addEventListener("click", drawCards);

function fetchDeck() {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
    .then((response) => response.json())
    .then((data) => {
      deckId = data.deck_id;
      localStorage.setItem("deckId", deckId);
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
      renderCards(playerCards);
      determineWinner(playerCards);
    });
}

function renderCards(cardsArray) {
  console.log("rendering");
  cardsEl.innerHTML = cardsArray
    .map(
      ({ image, value, suit }, index) => `
        <div class="player-${index + 1}">
        <h3>Player ${index + 1}</h3>
        <img class="card-img" src=${image}  alt="${value} of ${suit}"/>
        </div>
    `
    )
    .join("");
}

function determineWinner(cards) {
  let card1 = cards[0].value;
  const card1Value = determineCardValue(card1);
  let card2 = cards[1].value;
  const card2Value = determineCardValue(card2);

  if (card1Value > card2Value) {
    console.log("Player 1 wins!");
  } else if (card2Value > card1Value) {
    console.log("Player 2 wins!");
  } else {
    console.log("It's a tie!");
  }
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
