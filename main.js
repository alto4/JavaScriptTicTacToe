// Create gameboard
const createGameboard = (function () {
  let gameboardContainer = document.querySelector(".gameboard");
  let grid = ["", "", "", "", "", "", "", "", ""];
  let gridId = 0;

  console.log(gameboardContainer);
  grid.forEach((square) => {
    let gridSquare = `
    <div class="grid-square" data-id="${gridId}">
    </div>`;

    gameboardContainer.innerHTML += gridSquare;
    gridId++;
  });
})();
