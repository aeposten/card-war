const newDeckBtn = selectComponent("deck-btn");
const drawButton = selectComponent("draw-card-btn");
const cardsEl = selectComponent("player-cards");

let deckId;
let playerCards;

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
    });
}

function renderCards(cardsArray) {
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
