// Card data
const cards = [{
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
let gameGrid = cards.concat(cards);

// Randomize game grid on each load
gameGrid.sort(() => 0.5 - Math.random());

// Define app root and outer grid
const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

// Set each card item to an image element and append to the DOM
gameGrid.forEach(card => {
  const div = document.createElement('div');
  div.classList.add('card');
  const img = document.createElement('img');
  img.setAttribute('src', card.img);
  div.dataset.name = card.name;
  grid.appendChild(div);
  div.appendChild(img);
});

// Select all card elements
const cardElements = document.querySelector('.grid')

let firstGuess = '';
let secondGuess = '';
let count = 0;
let matches = '';

// Reset on success and fail
const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;

};

function deselect() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
}

function match() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
}

function removeMatches() {
  var selected = document.querySelectorAll('.match');
  selected.forEach(card => {
    card.remove();
  });
}

cardElements.addEventListener('click', function (event) {
  let clicked = event.target;
  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.dataset.name;
      clicked.classList.add('selected');
    } else {
      secondGuess = clicked.dataset.name;
      clicked.classList.add('selected');
    }
    if (firstGuess !== '' && secondGuess !== '') {
      if (firstGuess === secondGuess) {
        match();
        resetGuesses();
        setTimeout(removeMatches, 1000);
        setTimeout(deselect, 1000);
      } else {
        resetGuesses();
        setTimeout(deselect, 1000);
      }
    }
  }
});