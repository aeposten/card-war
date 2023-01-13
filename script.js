// API base URL for card decks
const URL = "https://deckofcardsapi.com/api/deck/";

// Variables to store dom elements
const newDeckBtn = document.getElementById("deck-btn");
const drawButton = document.getElementById("draw-card-btn");
const cardsEl = document.getElementById("player-cards");
const winnerEl = document.getElementById("winner");
const remainingEl = document.getElementById("remaining-cards");
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");

// Variables to store data that will be set dynamically
let winnerMessage = "";
let computerScore = 0;
let playerScore = 0;

let deckId;
let playerCards;

// Event listeners for the new deck and draw buttons
newDeckBtn.addEventListener("click", fetchDeck);
drawButton.addEventListener("click", drawCards);

// Fetches a new deck of cards from the API and stores it in Local Storage
async function fetchDeck() {
  const response = await fetch(`${URL}new/shuffle/`);
  const data = await response.json();

  deckId = data.deck_id;

  // clears content of dom elements when a new deck is fetched
  resetElements();
  // Renders player scores on page
  renderScores(playerScore, computerScore);
  // Saves new deck in local storage
  localStorage.setItem("deckId", deckId);
  // Renders the number of remaining cards on page
  renderRemainingCards(data);
}

// Draws cards from the deck saved in local storage
async function drawCards() {
  const response = await fetch(
    `${URL}${localStorage.getItem("deckId")}/draw/?count=2`
  );
  const data = await response.json();

  // Sets plater cards to the fetched data
  playerCards = data.cards;
  // Renders the number of remaining cards on page
  renderRemainingCards(data);
  // Renders the cards that were drawn on the page
  renderCards(playerCards);
  // Renders the winner of hand or game on page
  renderWinnerMessage(data);
  // Increments player scores
  incrementScore(winnerMessage);
  // Remders player scores on page
  renderScores(playerScore, computerScore);
}

// Renders the cards that were drawn on the page
function renderCards(cardsArray) {
  // Maps over array of fetched cards and destructures each card object for rendering
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

// Sets the draw button status to disabled if no cards remain
function setDrawButtonStatus(deckData) {
  // If no cards remain the button is disabled and the disabled class is added to the classlist for styling
  if (deckData.remaining === 0) {
    drawButton.disabled = true;
    drawButton.classList.add("disabled");
  } else {
    drawButton.disabled = false;
    drawButton.classList.remove("disabled");
  }
}

// Renders the number of remaining cards on the page and uses setDrawButton status to disable/enable the draw button
function renderRemainingCards(deckData) {
  setDrawButtonStatus(deckData);
  remainingEl.textContent = `Cards Remaining: ${deckData.remaining}`;
}

// Renders the final winner of the game when no cards remain in the deck
function renderWinnerMessage(deckData) {
  winnerEl.textContent = determineWinnerMessage(playerCards);
  if (deckData.remaining === 0) {
    if (playerScore > computerScore) {
      winnerEl.textContent = "Player wins it all!";
    } else {
      winnerEl.textContent = "Computer wins it all!";
    }
  }
}

// Renders player scores on the page
function renderScores(playerScore, computerScore) {
  playerScoreEl.textContent = `Player: ${playerScore}`;
  computerScoreEl.textContent = `Computer: ${computerScore}`;
}

// Increments player or computer scores based on which winner message is set
function incrementScore(winnerMessage) {
  if (winnerMessage === "Computer Wins!") {
    computerScore++;
  } else if (winnerMessage === "You Win!") {
    playerScore++;
  }
}

// Determines the value of each card drawn from the deck
function determineCardValue(card) {
  let cardValue;

  // Because the face cards in the API are not given a numeric value I placed all the cards in an array arranged from most to least valuable, and I will use the index of each card to determine its value
  //prettier-ignore
  const cardsArray = [
    "2", "3", "4", "5", "6", "7",
    "8", "9", "10", "JACK", "QUEEN",
    "KING", "ACE",
  ];

  // Loop through cardsArray, if the card passed into the function is equal to the card in the cards array, set card value to the index, if it is not continue itrating through the array until a match is found
  for (let i = 0; i < cardsArray.length; i++) {
    if (cardsArray[i] === card) {
      cardValue = i;
      break;
    }
  }
  return cardValue;
}

// Determines the winner message based on the values of the cards
function determineWinnerMessage(cards) {
  // Assigns the card values to those calculated in determineCard value
  let card1 = cards[0].value;
  const card1Value = determineCardValue(card1);
  let card2 = cards[1].value;
  const card2Value = determineCardValue(card2);

  // Determines the winner and sets the winnerMessage based on card values
  if (card1Value > card2Value) {
    winnerMessage = "Computer Wins!";
  } else if (card2Value > card1Value) {
    winnerMessage = "You Win!";
  } else {
    winnerMessage = "War!";
  }

  return winnerMessage;
}

// Resets the text content of dom the cards and winner elements and the player scores at the end of the game and returns the reset scores
function resetElements() {
  cardsEl.textContent = "";
  winnerEl.textContent = "";
  computerScore = 0;
  playerScore = 0;

  return playerScore, computerScore;
}
