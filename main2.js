let counter = 0;
let gameboardContainer = document.querySelector(".gameboard");
let gridSquares;
let grid = ["", "", "", "", "", "", "", "", ""];

// Create gameboard
function createGameboard() {
  let gridId = 0;

  // Add 9 grid squares
  grid.forEach((square) => {
    let gridSquare = `
      <div class="grid-square" data-id="${gridId}">
      </div>`;
    gameboardContainer.innerHTML += gridSquare;
    gridId++;
  });

  addEventListeners();
  return { createGameboard };
}

createGameboard();
function mark() {
  grid[this.dataset.id] = counter % 2 === 0 ? "X" : "O";
  this.innerText = counter % 2 === 0 ? "X" : "O";
  this.removeEventListener("click", mark);
  counter++;
  setTimeout(checkWinners, 500);
}

// Check for winners
function checkWinners() {
  if (
    // Horizontal wins
    (grid[0] == grid[1] && grid[0] == grid[2] && grid[0] !== "") ||
    (grid[3] == grid[4] && grid[3] == grid[5] && grid[3] !== "") ||
    (grid[6] == grid[7] && grid[6] == grid[8] && grid[6] !== "") ||
    // Vertical wins
    (grid[0] == grid[3] && grid[0] == grid[6] && grid[0] !== "") ||
    (grid[1] == grid[4] && grid[1] == grid[7] && grid[4] !== "") ||
    (grid[2] == grid[5] && grid[2] == grid[8] && grid[2] !== "") ||
    // Diagonal wins
    (grid[0] == grid[4] && grid[0] == grid[8] && grid[0] !== "") ||
    (grid[2] == grid[4] && grid[2] == grid[6] && grid[2] !== "")
  ) {
    gameboardContainer.innerHTML = "<h1>Winner</h1>";
    gameboardContainer.innerHTML +=
      '<button class="btn" id="btn-reset">Reset</button>';
    let resetButton = document.querySelector("#btn-reset");

    resetButton.addEventListener("click", function () {
      alert("MORNING!");
      reset();
    });
  }

  // Check if all squares have been filled
  if (grid.indexOf("") == -1) {
    gameboardContainer.innerHTML = "<h1>Winner</h1>";
    gameboardContainer.innerHTML +=
      '<button class="btn" id="btn-reset">Reset</button>';
    let resetButton = document.querySelector("#btn-reset");

    resetButton.addEventListener("click", function () {
      window.location = "/";
    });
  }
}

function reset() {
  alert("RESET HERE");
  for (let i = 0; i < gridSquares.length; i++) {
    gridSquares[i].innerText = "";
    grid[i] = "";
    counter = 1;
  }

  gameboardContainer.innerHTML = "";

  // Add 9 grid squares
  let gridId = 0;
  grid.forEach((square) => {
    let gridSquare = `
    <div class="grid-square" data-id="${gridId}">
    </div>`;
    gameboardContainer.innerHTML += gridSquare;
    gridId++;
  });

  addEventListeners();
}

function resetGameboard() {
  addEventListeners();
}

function mark() {
  grid[this.dataset.id] = counter % 2 === 0 ? "X" : "O";
  this.innerText = counter % 2 === 0 ? "X" : "O";
  this.removeEventListener("click", mark);
  counter++;
  setTimeout(checkWinners, 500);
}

// Add grid square event listeners
function addEventListeners() {
  gridSquares = [...document.querySelectorAll(".grid-square")];

  gridSquares.forEach((square) => {
    square.removeEventListener("click", mark);
    square.addEventListener("click", mark);
  });

  return { createGameboard, gridSquares, mark };
}
