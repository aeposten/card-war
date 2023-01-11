const deckBtn = selectComponent("deck-btn");

function selectComponent(elementId) {
  let component = document.getElementById(elementId);
  return component;
}

deckBtn.addEventListener("click", fetchDeck);

function fetchDeck() {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
    .then((response) => response.json())
    .then((data) => console.log(data));
}
