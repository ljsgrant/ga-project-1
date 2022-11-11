function init() {


//#region Build Grid
  const grid = document.querySelector(".grid");
  const gridSquares = [];
  const gridColumns = 10;
  const gridRows = 10
  const gridSquareCount = gridColumns * gridRows;

  function buildGrid() {
    for (let index = 0; index < gridSquareCount; index++) {
      const gridSquare = document.createElement("div");
      gridSquare.setAttribute("data-index", index);
      gridSquares.push(gridSquare);
      grid.appendChild(gridSquare);
    }
  }
  buildGrid();

//#endregion



}

document.addEventListener("DOMContentLoaded", init);
