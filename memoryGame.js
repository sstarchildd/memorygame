const gameContainer = document.getElementById("game");
let cardA = null;
let cardB = null;
let cardsFlipped = 0;
let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "black",
  "teal",
  "turquoise",
  "salmon",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "black",
  "teal",
  "turquoise",
  "salmon"
];

function shuffle(array) {
  let counter = array.length;

 
  while (counter > 0) {
   
    let index = Math.floor(Math.random() * counter);

    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(e) {
  if (noClicking) return;
  if (e.target.classList.contains("flipped")) return;

  let currentCard = e.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!cardA || !cardB) {
    currentCard.classList.add("flipped");
    cardA = cardA || currentCard;
    cardB = currentCard === cardA ? null : currentCard;
  }

  if (cardA && cardB) {
    noClicking = true;
    // debugger
    let gifA = cardA.className;
    let gifB = cardB.className;

    if (gifA === gifB) {
      cardsFlipped += 2;
      cardA.removeEventListener("click", handleCardClick);
      cardB.removeEventListener("click", handleCardClick);
      cardA = null;
      cardB = null;
      noClicking = false;
    } else {
      setTimeout(function() {
        cardA.style.backgroundColor = "";
        cardB.style.backgroundColor = "";
        cardA.classList.remove("flipped");
        cardB.classList.remove("flipped");
        cardA = null;
        cardB = null;
        noClicking = false;
      }, 1000);
    }
  }

  if (cardsFlipped === COLORS.length) alert("YOU WIN! Now you owe me $20 xD");
}

createDivsForColors(shuffledColors);
