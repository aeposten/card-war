const newDeckBtn = selectComponent("deck-btn");
const drawButton = selectComponent("draw-card-btn")
let deckId = "";

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
      console.log(deckId)
    });
}

function drawCards() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then((response) => response.json())
        .then((data) => console.log(data.cards))
}