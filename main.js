const game = (function () {
  let counter = 0;
  let gameboardContainer = document.querySelector(".gameboard");
  let gridSquares;
  let grid = ["", "", "", "", "", "", "", "", ""];

  // Create gameboard
  const createGameboard = (function () {
    let gridId = 0;

    // Add 9 grid squares
    grid.forEach((square) => {
      let gridSquare = `
    <div class="grid-square" data-id="${gridId}">
    </div>`;
      gameboardContainer.innerHTML += gridSquare;
      gridId++;
    });

    // Add grid square event listeners
    const addEventListeners = (function () {
      gridSquares = [...document.querySelectorAll(".grid-square")];

      gridSquares.forEach((square) => {
        square.addEventListener("click", mark);
      });

      return { gridSquares, mark };
    })();

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

        resetButton.addEventListener("click", resetGameboard);
      }

      // Check if all squares have been filled
      if (grid.indexOf("") == -1) {
        alert("TIE");
        resetGameboard();
        gameboardContainer.innerHTML += '<button class="btn">Reset</button>';
      }
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
})();
