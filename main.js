let counter = 0;

// Create gameboard
const createGameboard = (function () {
  let gameboardContainer = document.querySelector(".gameboard");
  let gridSquares;
  let grid = ["", "", "", "", "", "", "", "", ""];
  let gridId = 0;

  grid.forEach((square) => {
    let gridSquare = `
    <div class="grid-square" data-id="${gridId}">
    </div>`;
    gameboardContainer.innerHTML += gridSquare;
    gridId++;
  });

  // Add grid event listeners
  const addEventListeners = (function () {
    gridSquares = [...document.querySelectorAll(".grid-square")];

    gridSquares.forEach((square) => {
      square.addEventListener("click", mark);
    });

    return { gridSquares, mark };
  })();

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
      alert("WINNA!");
      resetGameboard();
    }

    // Check if all squares have been filled
    if (grid.indexOf("") == -1) {
      alert("TIE");
    }
  }

  function mark() {
    grid[this.dataset.id] = counter % 2 === 0 ? "X" : "O";
    this.innerText = counter % 2 === 0 ? "X" : "O";
    this.removeEventListener("click", mark);
    counter++;
    setTimeout(checkWinners, 500);
  }

  function resetGameboard() {
    for (let i = 0; i < gridSquares.length; i++) {
      gridSquares[i].innerText = "";
      grid[i] = "";
      counter = 1;
    }

    gridSquares.forEach((square) => {
      square.removeEventListener("click", mark);
      square.addEventListener("click", function mark() {
        grid[square.dataset.id] = counter % 2 === 0 ? "X" : "O";
        square.innerText = counter % 2 === 0 ? "X" : "O";
        square.removeEventListener("click", mark);
        counter++;
        setTimeout(checkWinners, 500);
      });
    });
  }
  return { grid };
})();
