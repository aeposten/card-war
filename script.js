const newDeckBtn = selectComponent("deck-btn");

function selectComponent(elementId) {
  let component = document.getElementById(elementId);
  return component;
}

newDeckBtn.addEventListener("click", fetchDeck);

function fetchDeck() {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
    .then((response) => response.json())
    .then((data) => console.log(data));
}


setTimeout(() => {
    console.log("I finally ran!")
}, 2000)