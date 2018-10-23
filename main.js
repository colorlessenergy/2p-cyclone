// need to display 5 circles on screen
// have each single circle flash in a linear line every 2 seconds
// have a button when you click on it stops the light from going in a linear lie
// if it stopped at the middle flash all the circles green and restart the game

// if the button is pressed again

let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');

canvas.height = 300;
canvas.width = 400;

let amountOfCircles = 5;
let circlesData = [];
// context.fillRect(0, 0, canvas.width, canvas.height);

// display and store the circles

for (let i = 0; i < amountOfCircles; i++) {
  circlesData[i] = {
    x: (i + 1) * 50,
    y: canvas.height / 2,
    winner: i === 2 ? true : false
  };

  context.beginPath();
  context.arc((i + 1) * 50, canvas.height / 2, 10, 0, 2 * Math.PI);
  context.stroke();
}

// flash a light through the circles
let index = 0;
let currentTimeOut;



function flashCircles(arr, currentIndex) {
  if (arr[currentIndex - 1]) {
    context.beginPath();
    context.arc(arr[currentIndex - 1].x, arr[currentIndex - 1].y, 10, 0, 2 * Math.PI);
    context.fillStyle = 'white';
    context.fill()
  }

  context.beginPath();
  context.arc(arr[currentIndex].x, arr[currentIndex].y, 10, 0, 2 * Math.PI);
  context.fillStyle = 'green';
  context.fill()

  currentTimeOut = setTimeout(() => {
    if (currentIndex == 4) {
      arr = arr.reverse();
      currentIndex = 0;
    };
    currentIndex += 1;
    index = currentIndex;
    flashCircles(arr, currentIndex)
  }, 100);
}


flashCircles(circlesData, index);

// need button to stop the movement

let button1 = document.querySelector('.btn');
let button2 = document.querySelector('.btn2');

button1.addEventListener('click', () => {
  stopGame();
  checkWinner(index, 1);
});

button2.addEventListener('click', () => {
  stopGame();
  checkWinner(index, 2);
});

function stopGame () {
  window.clearTimeout(currentTimeOut);
  currentTimeOut = false;
};

function checkWinner(move, player) {
  if (circlesData[move].winner) {
    alert('player ' + player + ' ' + circlesData[move].winner)
  }
};

let button3 = document.querySelector('.btn3');

button3.addEventListener('click', () => {
  if (gameOver() == false) {
    playAgain();
    index = 0;
  }
});

function playAgain() {
  // restart the game

  circlesData.forEach((circle, currentIndex, arr) => {
    context.beginPath();
    context.arc(arr[currentIndex].x, arr[currentIndex].y, 10, 0, 2 * Math.PI);
    context.fillStyle = 'white';
    context.fill()
  });

  flashCircles(circlesData, 0);
}

function gameOver() {
  return currentTimeOut;
}