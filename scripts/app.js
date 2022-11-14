function init() {
  class Player {
    constructor(name, score = 0) {
      this.name = name;
      this.score = score;
    }
  }

  const currentPlayer = new Player("Louis", 0);

  //#region Build Grid
  const grid = document.querySelector(".grid");
  const gridSquares = [];
  const gridColumns = 10 + 4;
  const gridRows = 20 + 4;
  const gridSquareCount = gridColumns * gridRows;

  function buildGrid() {
    for (let index = 0; index < gridSquareCount; index++) {
      const gridSquare = document.createElement("div");
      gridSquare.setAttribute("data-index", index);
      if (index < gridColumns * 2) {
        gridSquare.classList.add("top-of-grid");
      }
      if ((index - 2) % gridColumns === 0) {
        gridSquare.classList.add("left-bounds");
      }
      if ((index + 3) % gridColumns === 0) {
        gridSquare.classList.add("right-bounds");
      }
      if (index > gridColumns * gridRows - (gridColumns * 2 + 1)) {
        gridSquare.classList.add("bottom-bounds");
      }
      if (
        index % gridColumns === 0 ||
        (index - 1) % gridColumns === 0 ||
        (index + 1) % gridColumns === 0 ||
        (index + 2) % gridColumns === 0
      ) {
        gridSquare.setAttribute("class", "out-of-bounds");
      }
      // gridSquare.textContent = index;
      gridSquares.push(gridSquare);
      grid.appendChild(gridSquare);
    }
  }
  buildGrid();

  //#endregion

  const scoreDisplay = document.querySelector(".score");
  scoreDisplay.innerText = currentPlayer.score;

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
    blockL: {
      rot0: [
        [0, 0, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      rot90: [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ],
      rot180: [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      rot270: [
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
      ],
    },
    blockO: {
      rot0: [
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      rot90: [
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      rot180: [
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      rot270: [
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    },
    blockS: {
      rot0: [
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      rot90: [
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0],
      ],
      rot180: [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
      ],
      rot270: [
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
      ],
    },
    blockT: {
      rot0: [
        [0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      rot90: [
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
      ],
      rot180: [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
      ],
      rot270: [
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
      ],
    },
    blockZ: {
      rot0: [
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      rot90: [
        [0, 0, 1, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
      ],
      rot180: [
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ],
      rot270: [
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    },
  };

  const possibleBlocks = ["I", "J", "L", "O", "S", "T", "Z"];
  let currentBlock = allBlocks["blockJ"];
  let currentBlockRotation = 0;
  let fallTimer; // cancel this to end current block fall
  let blockFallSpeed = 500; // will increase this as player advances in levels and/or when player performs a soft drop
  let obstructedSquares; // will use to check if block can continue falling

  console.log(Object.keys(currentBlock)[3]);

  const spawnOrigin = 33; // where each block appears on the map
  let currentOrigin = spawnOrigin; // where the block currently is on the map
  let currentRenderRow; // where to start rendering a row
  let currentRenderSquare; // the current square that will be rendered

  // select the correct block and its correct rotation to render, using:
  let currentBlockMatrix;

  function setBlockMatrix() {
    currentBlockMatrix =
      allBlocks[`block${currentBlock}`][`rot${currentBlockRotation}`];
  }

  function resetBlockProperties() {
    currentBlockRotation = 0;
    currentOrigin = spawnOrigin;
    currentRenderRow = spawnOrigin;
    currentRenderSquare = spawnOrigin;
  }

  function newBlock() {
    resetBlockProperties();
    serveBlock();
    renderNewPosition();
    blockFall();
  }
  // give the player a block on page load (change to game start later)
  newBlock();

  // serve a block to player by selecting randomly from the above array:
  function serveBlock() {
    currentBlock =
      possibleBlocks[Math.round(Math.random() * (possibleBlocks.length - 1))];
    setBlockMatrix();
  }

  function fillSquare(position) {
    gridSquares[position].classList.add("active-block");
  }

  function clearSquare(position) {
    gridSquares[position].classList.remove("active-block");
  }

  function moveBlockDown() {
    if (
      checkObstructedSquaresBelow() === 0 &&
      document.querySelectorAll(".active-block.bottom-bounds").length === 0
    ) {
      clearOldPosition();
      currentOrigin += gridColumns;
      renderNewPosition();
    }
  }

  function getCurrentActiveSquares() {
    return Array.from(document.querySelectorAll(".active-block"));
  }

  function checkObstructedSquaresBelow() {
    const currentActiveSquares = getCurrentActiveSquares();
    obstructedSquares = 0;
    // check if any of the squares below the current block are occupied
    currentActiveSquares.forEach((activeSquare) => {
      // get the square immediately below
      const squareBelow = parseInt(activeSquare.dataset.index) + gridColumns;
      // if it's obstructed, make obstructedSquares non-zero
      if (
        gridSquares[squareBelow].classList.contains("bottom-bounds") ||
        gridSquares[squareBelow].classList.contains("static-block")
      ) {
        obstructedSquares++;
      }
    });
    return obstructedSquares;
  }

  function blockFall() {
    fallTimer = setInterval(() => {
      const currentActiveSquares = getCurrentActiveSquares();

      // move the block down if there are no obstructedSquares, otherwise stop it falling
      if (checkObstructedSquaresBelow() === 0) {
        console.log("not there yet");
        moveBlockDown();
      } else {
        console.log("reached the bottom!");
        clearInterval(fallTimer);
        clearOldPosition();
        currentActiveSquares.forEach((activeSquare) =>
          gridSquares[activeSquare.dataset.index].classList.add("static-block")
        );
        clearRows();
        newBlock();
        return;
      }
    }, blockFallSpeed);
  }

  function clearRows() {
    // index will be the start of the bottommost row that is within the left-bounds and bottom-bounds
    for (
      let index = parseInt(
        gridSquares[gridSquares.length - gridColumns * 3 + 2].dataset.index
      );
      // loop will stop before entering the top-bounds
      index >= gridColumns * 2;
      index -= gridColumns
    ) {
      const rowToCheck = gridSquares.slice(index, index + 10);
      // console.log(rowToCheck);
      if (
        rowToCheck.every((square) => square.classList.contains("static-block"))
      ) {
        console.log("MADE A ROW!!!!");
        rowToCheck.forEach((square) => square.classList.remove("static-block"));
        const allStaticBlocks = Array.from(
          document.querySelectorAll(".static-block")
        );
        const blocksToMoveDown = [];
        console.log("blocks to move down", blocksToMoveDown);
        allStaticBlocks.forEach((square) => {
          if (parseInt(square.dataset.index) < index) {
            blocksToMoveDown.push(square);
          }
        });
        blocksToMoveDown.forEach((square) =>
          square.classList.remove("static-block")
        );
        blocksToMoveDown.forEach((square) =>
          gridSquares[
            parseInt(square.dataset.index) + gridColumns
          ].classList.add("static-block")
        );
        console.log("reached end of clearRows");
        incrementScore();
        clearRows();
      }
    }
  }

  function incrementScore() {
    currentPlayer.score++;
    scoreDisplay.innerText = currentPlayer.score;
  }

  window.addEventListener("keydown", moveBlock);
  window.addEventListener("keydown", rotateBlock);

  function moveBlock(event) {
    const currentActiveSquares = getCurrentActiveSquares();
    obstructedSquares = 0;

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
      // check if any of the squares left of current block are occupied
      currentActiveSquares.forEach((activeSquare) => {
        // get the square immediately to the left
        const squareToLeft = parseInt(activeSquare.dataset.index) - 1;
        // if it's obstructed, make obstructedSquares non-zero
        if (gridSquares[squareToLeft].classList.contains("static-block")) {
          obstructedSquares++;
        }
      });
      // move the block left if there are no obstructedSquares AND the block isn't at the left bounds
      if (
        obstructedSquares === 0 &&
        document.querySelectorAll(".active-block.left-bounds").length === 0
      ) {
        clearOldPosition();
        currentOrigin -= 1;
        renderNewPosition();
      }
    }
    function moveBlockRight() {
      // check if any of the squares right of current block are occupied
      currentActiveSquares.forEach((activeSquare) => {
        // get the square immediately to the right
        const squareToRight = parseInt(activeSquare.dataset.index) + 1;
        // if it's obstructed, make obstructedSquares non-zero
        if (gridSquares[squareToRight].classList.contains("static-block")) {
          obstructedSquares++;
        }
      });
      // move the block left if there are no obstructedSquares AND the block isn't at the left bounds
      if (
        obstructedSquares === 0 &&
        document.querySelectorAll(".active-block.right-bounds").length === 0
      ) {
        clearOldPosition();
        currentOrigin += 1;
        renderNewPosition();
      }
    }
  }

  function rotateBlock(event) {
    if (obstructedSquares === 0) {
      switch (event.keyCode) {
        case 90:
          console.log("rotate left");
          // moveBlockDown();
          clearOldPosition();
          if (currentBlockRotation === 0) {
            currentBlockRotation = 270;
          } else {
            currentBlockRotation -= 90;
          }
          setBlockMatrix();
          renderNewPosition();
          console.log("current rotation:", currentBlockRotation);
          break;
        case 88:
          console.log("rotate right");
          // moveBlockDown();
          clearOldPosition();
          if (currentBlockRotation === 270) {
            currentBlockRotation = 0;
          } else {
            currentBlockRotation += 90;
          }
          setBlockMatrix();
          renderNewPosition();
          console.log("current rotation:", currentBlockRotation);
          break;
      }
    }
  }

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
          if (
            gridSquares[currentRenderSquare].classList.contains("active-block")
          ) {
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
