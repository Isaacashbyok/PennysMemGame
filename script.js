const gameContainer = document.getElementById('game');
let card1 = null; //sets first clicked card to null
let card2 = null; //sets second clicked card to null

let img = document.createElement('img');
img = ('src', 'imgs/00Penny.jpg'); //creates an img element for the fronts of the cards

const endGame = document.getElementById('end-game'); //var for endgame div

let score = 0;

let cardCounter = 0;

let noClick = false;

const COLORS = [
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'blue',
  'green',
  'orange',
  'purple',
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
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
    // create a new div
    const newDiv = document.createElement('div');

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener('click', handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(e) {
  if (noClick) return;
  if (e.target.classList.contains('flipped')) return; //if card is already flipped, do nothing
  e.target.style.backgroundImage = 'none'; //set background image to none when card is flipped
  let currentCard = e.target; //variable for clicked card
  currentCard.style.backgroundColor = currentCard.classList[0]; //sets backside color of card when clicked

  score++; //score counter

  if (!card1 || !card2) {
    currentCard.classList.add('flipped'); //if card 1 or 2 is flipped, add class called flipped

    card1 = card1 || currentCard; // sets card1 to current card
    card2 = currentCard === card1 ? null : currentCard; //sets card2 to currentcard
  }

  if (card1 && card2) {
    noClick = true; //doesn't allow card to be clicked again

    if (card1.className === card2.className) {
      cardCounter += 2; //sets cardcounter to two
      card1.removeEventListener('click', handleCardClick); //removes ability to click on a matched pair
      card2.removeEventListener('click', handleCardClick);
      card1 = null; //resets cards to null
      card2 = null;
      noClick = false;
    } else {
      setTimeout(function () {
        card1.style.backgroundImage = ''; //resets background img
        card2.style.backgroundImage = '';
        card1.classList.remove('flipped'); //removes flipped class
        card2.classList.remove('flipped');
        card1 = null; //resets card values to null
        card2 = null;
        noClick = false;
      }, 1000);
    }
  }
  if (cardCounter === COLORS.length) {
    let finalScore = document.getElementById('finalscore'); //final score variable
    finalScore.textContent = `Score: ${score}`; //adds text for final score value
    endGame.style.visibility = 'visible'; //sets endgame box to visible
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
