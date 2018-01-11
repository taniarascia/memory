// Card data
const cardsArray = [{
    'name': 'shell',
    'img': 'img/blueshell.png',
  },
  {
    'name': 'star',
    'img': 'img/star.png',
  },
  {
    'name': 'bobomb',
    'img': 'img/bobomb.png',
  },
  {
    'name': 'mario',
    'img': 'img/mario.png',
  },
  {
    'name': 'luigi',
    'img': 'img/luigi.png',
  },
  {
    'name': 'peach',
    'img': 'img/peach.png',
  },
  {
    'name': '1up',
    'img': 'img/1up.png',
  },
  {
    'name': 'mushroom',
    'img': 'img/mushroom.png',
  },
  {
    'name': 'thwomp',
    'img': 'img/thwomp.png',
  },
  {
    'name': 'bulletbill',
    'img': 'img/bulletbill.png',
  },
  {
    'name': 'coin',
    'img': 'img/coin.png',
  },
  {
    'name': 'goomba',
    'img': 'img/goomba.png',
  },
];

// Duplicate array to create a match for each card
let gameGrid = cardsArray.concat(cardsArray);

// Randomize game grid on each load
gameGrid.sort(() => 0.5 - Math.random());

// Define app root and outer grid
const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

// Set each card item to a div element and append to the DOM
gameGrid.forEach(item => {
  const div = document.createElement('div');
  div.classList.add('card');
  div.style.backgroundImage = `url(${item.img}`;
  div.dataset.name = item.name;
  grid.appendChild(div);
});

// Select all card elements
let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;

// Reset on success and fail
const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
};

// Remove selected CSS
function deselect() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
}

// Add match CSS
function match() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
}

// Remove matches from DOM
function removeMatches() {
  var selected = document.querySelectorAll('.match');
  selected.forEach(card => {
    card.remove();
  });
}

// Click event 
grid.addEventListener('click', function (event) {
  // TO DO: prevent click on parent element
  let clicked = event.target;

  // Only count first two clicks
  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.dataset.name;
      clicked.classList.add('selected');
    } else if (count === 2 ) {
      secondGuess = clicked.dataset.name;
      clicked.classList.add('selected');
    }
    // If first and second guesses have been made
    if (firstGuess !== '' && secondGuess !== '') {
      // If the guesses aren't the same element and are the same
      if (firstGuess === secondGuess && event.target !== previousTarget) {
        match();
        resetGuesses();
        setTimeout(removeMatches, 1000);
        setTimeout(deselect, 1000);
      } else {
        resetGuesses();
        setTimeout(deselect, 1000);
      }
    }
    previousTarget = event.target;
  } else {
   // TO DO: do something to stop 3rd element from being selected
  }
});