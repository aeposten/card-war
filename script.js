// const newDeckBtn = selectComponent("deck-btn");

// function selectComponent(elementId) {
//   let component = document.getElementById(elementId);
//   return component;
// }

// newDeckBtn.addEventListener("click", fetchDeck);

// function fetchDeck() {
//   fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// }


document.getElementById("deck-btn").addEventListener("click", function() {
    console.log("click")
})