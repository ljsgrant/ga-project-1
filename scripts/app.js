function init() {
  //#region Build Grid
  const grid = document.querySelector(".grid");
  const gridSquares = [];
  const gridColumns = 10 + 4;
  const gridRows = 20 + 2;
  const gridSquareCount = gridColumns * gridRows;

  function buildGrid() {
    for (let index = 0; index < gridSquareCount; index++) {
      const gridSquare = document.createElement("div");
      gridSquare.setAttribute("data-index", index);

      if ((index - 2) % gridColumns === 0) {
        gridSquare.setAttribute("class", "left-bounds");
      }
      if ((index + 3) % gridColumns === 0) {
        gridSquare.setAttribute("class", "right-bounds");
      }
      if (index > gridColumns * gridRows - (gridColumns * 2 + 1)) {
        gridSquare.setAttribute("class", "bottom-bounds");
      }

      gridSquares.push(gridSquare);
      grid.appendChild(gridSquare);
    }
  }
  buildGrid();

  //#endregion

  const allBlocks = {
    blockI: {
      blockWidth: 4,
      bounds: [5, 6],
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
      blockWidth: 3,
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
  let currentBlock = allBlocks["blockJ"];
  let currentBlockRotation = 180;

  const spawnOrigin = 5; // where each block appears on the map
  let currentOrigin = spawnOrigin; // where the block currently is on the map
  let currentRenderRow; // where to start rendering a row
  let currentRenderSquare; // the current square that will be rendered
  let currentOriginRowStart = 0; // used to check if block will fall off screen when moving left/right
  let currentBlockMatrix; // will be the matrix of how to display the current block and its rotation

  // select the correct block and its correct rotation to render, using:
  currentBlockMatrix = currentBlock[`rot${currentBlockRotation}`];

  // serve a block to player by selecting randomly from the above array:
  // function serveBlock() {
  //   currentBlock =
  //     possibleBlocks[Math.floor(Math.random() * (possibleBlocks.length - 1))];
  //   console.log(allBlocks["blockI"]["rot0"]);
  // }

  // serveBlock();

  // placeholder to render a block onscreen for testing
  renderNewPosition();

  function fillSquare(position) {
    gridSquares[position].classList.add("filled");
  }

  function clearSquare(position) {
    gridSquares[position].classList.remove("filled");
  }

  function moveBlockDown() {
    if (document.querySelectorAll(".filled.bottom-bounds").length === 0) {
      clearOldPosition();
      currentOrigin += gridColumns;
      renderNewPosition();
      currentOriginRowStart += gridColumns;
    }
  }

  window.addEventListener("keydown", moveBlock);
  window.addEventListener("keydown", rotateBlock);

  function moveBlock(event) {
    console.log(document.querySelectorAll(".filled.right-bounds").length);

    switch (event.key) {
      case "ArrowLeft":
        moveBlockLeft();
        break;
      case "ArrowRight":
        moveBlockRight();
        break;
      case "ArrowDown":
        moveBlockDown();
        break;
    }
    function moveBlockLeft() {
      if (document.querySelectorAll(".filled.left-bounds").length === 0) {
        clearOldPosition();
        currentOrigin -= 1;
        renderNewPosition();
      }
    }
    function moveBlockRight() {
      if (document.querySelectorAll(".filled.right-bounds").length === 0) {
        clearOldPosition();
        currentOrigin += 1;
        renderNewPosition();
      }
    }
  }

  function rotateBlock() {}

  function renderNewPosition() {
    currentRenderRow = currentOrigin;
    currentRenderSquare = currentOrigin;
    for (let indexOuter = 0; indexOuter < 4; indexOuter++) {
      currentRenderSquare = currentRenderRow;
      for (let indexInner = 0; indexInner < 4; indexInner++) {
        if (currentBlockMatrix[indexOuter][indexInner] === 1) {
          fillSquare(currentRenderSquare);
        }
        // console.log(currentRenderSquare);
        currentRenderSquare++;
      }
      // console.log("current row:", currentRenderRow);
      currentRenderRow += gridColumns;
    }
  }

  function clearOldPosition() {
    currentRenderRow = currentOrigin;
    currentRenderSquare = currentOrigin;
    for (let indexOuter = 0; indexOuter < 4; indexOuter++) {
      currentRenderSquare = currentRenderRow;
      for (let indexInner = 0; indexInner < 4; indexInner++) {
        if (gridSquares[currentRenderSquare] !== undefined) {
          if (gridSquares[currentRenderSquare].classList.contains("filled")) {
            clearSquare(currentRenderSquare);
          }
        }
        currentRenderSquare++;
      }
      currentRenderRow += gridColumns;
    }
  }
}

document.addEventListener("DOMContentLoaded", init);
