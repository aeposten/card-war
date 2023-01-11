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


// function callback() {
//     console.log("I finally ran!")
// }

// setTimeout(callback, 2000)


const people = [
    { name: "Jack", hasPet: true, age: 12 },
    { name: "Jill", hasPet: false, age: 18 },
    { name: "Alice", hasPet: true, age: 22 },
    { name: "Bob", hasPet: false, age: 32 },
]

function petOwners(person) {
   return person.hasPet
}

function getAdults(person) {
    return person.age >= 18;
}

const petPeople = people.filter(petOwners)
const adults = people.filter(getAdults)

