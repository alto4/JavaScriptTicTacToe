let controller = (function gameboardController() {
  let mainMenu = document.querySelector(".menu");
  let playButton = document.querySelector(".btn-play");

  playButton.addEventListener("click", () => {
    mainMenu.hidden = true;
  });
})();

// Create gameboard and add all associated event listeners
let gameboard = (function createGameboard() {
  let counter = 0;
  let gameboardContainer = document.querySelector(".gameboard");
  let gridSquares;
  let grid = ["", "", "", "", "", "", "", "", ""];
  let gridId = 0;

  // Add 9 grid squares with unique data-ids
  grid.forEach((square) => {
    let gridSquare = `
      <div class="grid-square" data-id="${gridId}">
      </div>`;
    gameboardContainer.innerHTML += gridSquare;
    gridId++;
  });

  addEventListeners();

  // Add grid square event listeners, after removing potentially lingering events from prior games
  function addEventListeners() {
    gridSquares = [...document.querySelectorAll(".grid-square")];

    gridSquares.forEach((square) => {
      square.removeEventListener("click", mark);
      square.addEventListener("click", mark);
    });
  }

  // Mark clicked square if active
  function mark() {
    grid[this.dataset.id] = counter % 2 === 0 ? "X" : "O";
    this.innerText = counter % 2 === 0 ? "X" : "O";
    this.removeEventListener("click", mark);
    counter++;
    setTimeout(checkWinners, 500);
  }

  // Reset gameboard to default state
  function reset() {
    // Clear all array elements
    for (let i = 0; i < gridSquares.length; i++) {
      gridSquares[i].innerText = "";
      grid[i] = "";
      counter = 1;
    }

    // Delete grid squares then readd
    gameboardContainer.innerHTML = "";

    let gridId = 0;
    grid.forEach((square) => {
      let gridSquare = `
    <div class="grid-square" data-id="${gridId}">
    </div>`;
      gameboardContainer.innerHTML += gridSquare;
      gridId++;
    });

    // Add event listeners to new gameboard
    gameboard.addEventListeners();
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
      // Declare winner and show reset button
      gameboardContainer.innerHTML = "<h1>Winner</h1>";
      addResetButton();
    }

    // Check if all squares have been filled and no winner declared
    if (grid.indexOf("") == -1) {
      // Declare a draw and show reset button
      gameboardContainer.innerHTML = "<h1>It's a draw.</h1>";
      addResetButton();
    }

    // Add reset button and associated click event to start a new game
    function addResetButton() {
      gameboardContainer.innerHTML +=
        '<button class="btn" id="btn-reset">Reset</button>';
      let resetButton = document.querySelector("#btn-reset");

      resetButton.addEventListener("click", function () {
        reset();
      });
    }
  }
  return { createGameboard, addEventListeners, reset, checkWinners };
})();
