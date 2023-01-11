const newDeckBtn = selectComponent("deck-btn");

let deckId = "";

function selectComponent(elementId) {
  let component = document.getElementById(elementId);
  return component;
}

newDeckBtn.addEventListener("click", fetchDeck);

function fetchDeck() {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
    .then((response) => response.json())
    .then((data) => {
      deckId = data.deck_id;
      console.log(deckId)
    });
}

