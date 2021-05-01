let player1;
let player2;

let controller = (function gameboardController() {
  let mainMenu = document.querySelector(".menu");
  let playButton = document.querySelector(".btn-play");

  playButton.addEventListener("click", () => {
    player1 = playerFactory(
      document.querySelector("[name=player-1]").value,
      "X"
    );
    player2 = playerFactory(
      document.querySelector("[name=player-2]").value,
      "O"
    );

    // Prompt starting player to make first move
    document.querySelector(".action-prompt").innerText =
      player1.getName() + "'s turn.";
    mainMenu.hidden = true;

    return { player1, player2 };
  });

  return { player1, player2 };
})();

// Player factory
const playerFactory = (name, mark) => {
  const getName = () => {
    return name;
  };

  const getMark = () => {
    return mark;
  };

  return { getName, getMark };
};

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
  function mark(e) {
    document.querySelector(".action-prompt").innerText =
      (counter + 1) % 2 === 0
        ? player1.getName() + "'s turn."
        : player2.getName() + "'s turn.";
    grid[this.dataset.id] =
      (counter + 1) % 2 === 0 ? player1.getMark() : player2.getMark();
    this.innerText = counter % 2 === 0 ? player1.getMark() : player2.getMark();
    this.removeEventListener("click", mark);
    counter++;
    setTimeout(checkWinners(this.innerText), 1000);
  }

  // Reset gameboard to default state
  function reset() {
    counter = 0;
    // Prompt starting player to make first move
    document.querySelector(".action-prompt").innerText =
      player1.getName() + "'s turn.";
    // Clear all array elements
    for (let i = 0; i < gridSquares.length; i++) {
      gridSquares[i].innerText = "";
      grid[i] = "";
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
  function checkWinners(symbol) {
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
      gameboardContainer.innerHTML =
        symbol === player1.getMark()
          ? `<h1>${player1.getName()} Wins!</h1>`
          : `<h1>${player2.getName()} Wins!</h1>`;
      addResetButton();
    }
    // Check if all squares have been filled and no winner declared
    else if (grid.indexOf("") == -1) {
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
