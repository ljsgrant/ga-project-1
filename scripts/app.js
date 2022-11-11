function init() {
  //#region Build Grid
  const grid = document.querySelector(".grid");
  const gridSquares = [];
  const gridColumns = 10;
  const gridRows = 10;
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

  const allBlocks = {
    blockI: {
      rot0: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      rot90: [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
      rot180: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
      rot270: [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
    },
    blockJ: {
      rot0: [
        [1, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      rot90: [
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
      ],
      rot180: [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0],
      ],
      rot270: [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
      ],
    },
    blockL: {},
    blockO: {},
    blockS: {},
    blockT: {},
  };

  const possibleBlocks = ["I", "J"]; //, "L", "0", "S", "T", "Z"
  let currentBlock = "J";
  let currentRotation = 0;

  // serve a block to player by selecting randomly from the above array:
  // function serveBlock() {
  //   currentBlock =
  //     possibleBlocks[Math.floor(Math.random() * (possibleBlocks.length - 1))];
  //   console.log(allBlocks["blockI"]["rot0"]);
  // }

  const spawnOrigin = 3; // where each block appears on the map
  let currentOrigin = spawnOrigin; // where the block currently is on the map
  let currentRenderRow; // where to start rendering a row
  let currentRenderSquare; // the current square that will be rendered
  let currentBlockMatrix; // will be the matrix of how to display the current block and its rotation

  // serveBlock();
  renderBlock();

  function renderBlock() {
    // select the correct block and its correct rotation to render, using:
    currentBlockMatrix = allBlocks[`block${currentBlock}`][`rot0`];

    clearOldPosition();

    renderNewPosition(currentOrigin);
  }

  function fillSquare(position) {
    gridSquares[position].classList.add("filled");
  }

  function clearSquare(position) {
    gridSquares[position].classList.remove("filled");
  }

  function moveBlockDown() {
    currentOrigin += 10;
    renderBlock();
  }
  function moveBlockLeft() {
    currentOrigin -= 1;
    renderBlock();
  }
  function moveBlockRight() {
    currentOrigin += 1;
    renderBlock();
  }

  function renderNewPosition(matrixOrigin) {
    currentRenderRow = matrixOrigin;
    currentRenderSquare = matrixOrigin;
    for (let indexOuter = 0; indexOuter < 4; indexOuter++) {
      currentRenderSquare = currentRenderRow;
      for (let indexInner = 0; indexInner < 4; indexInner++) {
        if (currentBlockMatrix[indexOuter][indexInner] === 1) {
          fillSquare(currentRenderSquare);
        }
        console.log(currentRenderSquare);
        currentRenderSquare++;
      }
      console.log("current row:", currentRenderRow);
      currentRenderRow += 10;
    }
  }

  function clearOldPosition() {
    currentRenderRow = currentOrigin;
    currentRenderSquare = currentOrigin;
    for (let indexOuter = 0; indexOuter < 4; indexOuter++) {
      currentRenderSquare = currentRenderRow;
      for (let indexInner = 0; indexInner < 4; indexInner++) {
        if (gridSquares[currentRenderSquare].classList.contains("filled")) {
          gridSquares[currentRenderSquare].classList.remove("filled");
        }
        currentRenderSquare++;
      }
      currentRenderRow += 10;
    }
  }
}

document.addEventListener("DOMContentLoaded", init);
