function init() {
  class Player {
    constructor(name, score = 0) {
      this.name = name;
      this.score = score;
    }
  }

  const currentPlayer = new Player("Player1", 0);

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
        gridSquare.classList.add("out-of-bounds");
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

  let currentBlockMatrix; // how to render the current block and its rotation

  const spawnOrigin = 33; // where each block appears on the map
  let currentOrigin = spawnOrigin; // where the block currently is on the map
  let currentRenderRow; // where to start rendering a row
  let currentRenderSquare; // the current square that will be rendered

  let currentBlock;
  let currentBlockRotation = 0;

  let testOrigin; // will use for rotation tests
  let currentTestBlockRotation; // will use for rotation tests
  let testBlockMatrix; // use for test rotation before performing basic rotation or wall kick

  let fallTimer; // cancel this to end current block fall
  let blockFallSpeed = 500; // will increase this as player advances in levels and/or when player performs a soft drop
  let obstructedSquares; // will use to check if block can continue falling

  // UI elements
  const gridOverlay = document.querySelector(".grid-overlay");
  const playButton = document.querySelector(".play-button");
  playButton.addEventListener("click", startGame);
  const nextLevelButton = document.querySelector(".next-level-button");
  const playAgainButton = document.querySelector(".play-again-button");
  const overlayMessage = document.querySelector(".grid-overlay_message")

  window.addEventListener("keydown", moveBlock);
  window.addEventListener("keydown", testRotation);

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

  function startGame() {
    // playButton.style.display = none;
    // playAgainButton.style.display = none;
    // nextLevelButton.style.display = none;
    overlayMessage.innerText = "Get Ready!"
    playButton.style.display = "none";
    let countdown = 3;
    const startGameTimer = setInterval(() => {
      if (countdown > 0) {
        overlayMessage.innerText = countdown;
        countdown -= 1;
      } else {
        gridOverlay.style.display = "none";
        clearInterval(startGameTimer);
        newBlock();
      }
    }, 1000);
  }

  function nextLevel() {}

  function newBlock() {
    resetBlockProperties();
    serveBlock();
    renderNewPosition("active-block");
    blockFall();
  }

  function checkForGameOver() {
    if (currentOrigin < gridColumns * 3) {
      return true;
    }
  }

  function serveBlock() {
    currentBlock =
      possibleBlocks[Math.round(Math.random() * (possibleBlocks.length - 1))];
    setBlockMatrix();
    // fixes the spawn origin for I-block, which spawns with a blank top row of its matrix
    if (currentBlock === "I") {
      currentOrigin = spawnOrigin - gridColumns;
    } else {
      currentOrigin = spawnOrigin;
    }
  }

  function moveBlockDown() {
    if (
      checkObstructedSquaresBelow() === 0 &&
      document.querySelectorAll(".active-block.bottom-bounds").length === 0
    ) {
      clearOldPosition();
      currentOrigin += gridColumns;
      renderNewPosition("active-block");
    }
  }

  function getCurrentActiveSquares(classSelector = ".active-block") {
    return Array.from(document.querySelectorAll(classSelector));
  }

  function checkObstructedSquaresBelow() {
    const currentActiveSquares = getCurrentActiveSquares();
    obstructedSquares = 0;
    currentActiveSquares.forEach((activeSquare) => {
      const squareBelow = parseInt(activeSquare.dataset.index) + gridColumns;
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
      if (checkObstructedSquaresBelow() === 0) {
        moveBlockDown();
      } else {
        clearInterval(fallTimer);
        clearOldPosition();
        // add to stack:
        addToStack(currentActiveSquares);
        clearRows();
        if (checkForGameOver() === true) {
          gridOverlay.style.display = "flex";
          return;
        } else {
          newBlock();
          return;
        }
      }
    }, blockFallSpeed);

    function addToStack(currentActiveSquares) {
      currentActiveSquares.forEach((activeSquare) =>
        gridSquares[activeSquare.dataset.index].classList.add(
          "static-block",
          `block-${currentBlock}`
        )
      );
    }
  }

  function clearRows() {
    // index will be the start of the bottommost row that is within the left-bounds and bottom-bounds
    for (
      let index = parseInt(
        gridSquares[gridSquares.length - gridColumns * 3 + 2].dataset.index
      ); // index starts at the lowest lefthand corner of the playable grid
      index >= gridColumns * 2; // loop will stop before entering the top-bounds
      index -= gridColumns // go up by one row each iteration
    ) {
      const rowToCheck = gridSquares.slice(index, index + 10);
      if (
        rowToCheck.every((square) => square.classList.contains("static-block"))
      ) {
        // remove the complete row
        rowToCheck.forEach((square) =>
          square.classList.remove(
            "static-block",
            "block-I",
            "block-O",
            "block-T",
            "block-S",
            "block-J",
            "block-Z",
            "block-L"
          )
        );

        // get remaining static blocks on the grid
        const allStaticBlocks = Array.from(
          document.querySelectorAll(".static-block")
        );

        // get which blocks to move down (all blocks above the removed row)
        let blocksToMoveDown = [];
        allStaticBlocks.forEach((square) => {
          if (parseInt(square.dataset.index) < index) {
            blocksToMoveDown.push(square);
            console.log(square.dataset.index);
          }
        });
        console.log(blocksToMoveDown);

        // make sure we're starting from the bottom-right square and working backwards & upwards:
        blocksToMoveDown = blocksToMoveDown.reverse();
        // move the blocks down
        blocksToMoveDown.forEach((square) => {
          const squareClasses = Array.from(square.classList);
          square.classList.remove(
            "static-block",
            "block-I",
            "block-O",
            "block-T",
            "block-S",
            "block-J",
            "block-Z",
            "block-L"
          );

          const squareBelow =
            gridSquares[parseInt(square.dataset.index) + gridColumns];
          squareClasses.forEach((squareClass) =>
            squareBelow.classList.add(squareClass)
          );
        });

        incrementScore();
        clearRows();
      }
    }
  }

  function incrementScore() {
    currentPlayer.score++;
    scoreDisplay.innerText = currentPlayer.score;
  }

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
        renderNewPosition("active-block");
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
        renderNewPosition("active-block");
      }
    }
  }

  function rotateBlock(keyCode) {
    if (obstructedSquares === 0) {
      switch (keyCode) {
        // z key to rotate left
        case 90:
          clearOldPosition();
          if (currentBlockRotation === 0) {
            currentBlockRotation = 270;
          } else {
            currentBlockRotation -= 90;
          }
          setBlockMatrix();
          renderNewPosition("active-block");
          break;
        // x key to rotate right
        case 88:
          clearOldPosition();
          if (currentBlockRotation === 270) {
            currentBlockRotation = 0;
          } else {
            currentBlockRotation += 90;
          }
          setBlockMatrix();
          renderNewPosition("active-block");
          break;
      }
    }
  }

  function renderNewPosition(
    classSelector = "active-block",
    origin = currentOrigin,
    blockMatrix = currentBlockMatrix
  ) {
    currentRenderRow = origin;
    currentRenderSquare = origin;
    for (let indexOuter = 0; indexOuter < 4; indexOuter++) {
      currentRenderSquare = currentRenderRow;
      for (let indexInner = 0; indexInner < 4; indexInner++) {
        if (blockMatrix[indexOuter][indexInner] === 1) {
          gridSquares[currentRenderSquare].classList.add(classSelector);
          if (classSelector === "active-block") {
            gridSquares[currentRenderSquare].classList.add(
              `block-${currentBlock}`
            );
          }
        }
        currentRenderSquare++;
      }
      currentRenderRow += gridColumns;
    }
  }

  function clearOldPosition(
    classSelector = "active-block",
    origin = currentOrigin
  ) {
    currentRenderRow = origin;
    currentRenderSquare = origin;
    for (let indexOuter = 0; indexOuter < 4; indexOuter++) {
      currentRenderSquare = currentRenderRow;
      for (let indexInner = 0; indexInner < 4; indexInner++) {
        if (gridSquares[currentRenderSquare] !== undefined) {
          if (
            gridSquares[currentRenderSquare].classList.contains(classSelector)
          ) {
            gridSquares[currentRenderSquare].classList.remove(classSelector);
            if (classSelector === "active-block") {
              gridSquares[currentRenderSquare].classList.remove(
                `block-${currentBlock}`
              );
            }
          }
        }
        currentRenderSquare++;
      }
      currentRenderRow += gridColumns;
    }
  }

  function setTestBlockMatrix() {
    testBlockMatrix =
      allBlocks[`block${currentBlock}`][`rot${currentTestBlockRotation}`];
  }

  function testRotation(event) {
    let occupiedSquares;
    let outOfBoundsSquares;

    // set test rotation according to which way player wants to rotate
    switch (event.keyCode) {
      case 90:
        if (currentBlockRotation === 0) {
          currentTestBlockRotation = 270;
        } else {
          currentTestBlockRotation = currentBlockRotation - 90;
        }
        break;
      case 88:
        if (currentBlockRotation === 270) {
          currentTestBlockRotation = 0;
        } else {
          currentTestBlockRotation = currentBlockRotation + 90;
        }
        break;
    }
    setTestBlockMatrix();

    function tryRotate() {
      renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
      outOfBoundsSquares = document.querySelectorAll(
        ".block-rotate-test.out-of-bounds"
      );
      occupiedSquares = document.querySelectorAll(
        ".block-rotate-test.static-block"
      );
      clearOldPosition("block-rotate-test", testOrigin);
      if (outOfBoundsSquares.length === 0 && occupiedSquares.length === 0) {
        clearOldPosition();
        currentOrigin = testOrigin;
        rotateBlock(event.keyCode);
        return true;
      } else {
        outOfBoundsSquares = null;
        occupiedSquares = null;
      }
    }

    if (currentBlock === "O") {
      // * we don't try rotation for blockO, all states are the same
      return;
    } else if (currentBlock === "I") {
      // * tests for I
      // rotating left (z key)
      if (event.keyCode === 90) {
        switch (currentBlockRotation) {
          case 0:
            testOrigin = currentOrigin; // test 1 (basic rotation)
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 1; // test 2
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 2; // test 3
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 1 - gridColumns * 2; // test 4
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 2 + gridColumns; // test 5
            if (tryRotate() === true) {
              return;
            }
            break;
          case 90:
            testOrigin = currentOrigin; // test 1 (basic rotation)
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 2; // test 2
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 1; // test 3
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 2 - gridColumns; // test 4
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 1 + gridColumns * 2; // test 5
            if (tryRotate() === true) {
              return;
            }
            break;
          case 180:
            testOrigin = currentOrigin; // test 1 (basic rotation)
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1; // test 2
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 2; // test 3
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1 + gridColumns * 2; // test 4
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 2 - gridColumns; // test 5
            if (tryRotate() === true) {
              return;
            }
            break;
          case 270:
            testOrigin = currentOrigin; // test 1 (basic rotation)
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 2; // test 2
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1; // test 3
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 2 + gridColumns; // test 4
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1 - gridColumns * 2; // test 5
            if (tryRotate() === true) {
              return;
            }
            break;
        }
        // rotating right (x key)
      } else if (event.keyCode === 88) {
        switch (currentBlockRotation) {
          case 0:
            testOrigin = currentOrigin; // test 1 (basic rotation)
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 2; // test 2
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1; // test 3
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 2 + gridColumns; // test 4
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1 - gridColumns * 2; // test 5
            if (tryRotate() === true) {
              return;
            }
            break;
          case 90:
            testOrigin = currentOrigin; // test 1 (basic rotation)
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 1; // test 2
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 2; // test 3
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 1 - gridColumns * 2; // test 4
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 2 + gridColumns; // test 5
            if (tryRotate() === true) {
              return;
            }
            break;
          case 180:
            testOrigin = currentOrigin; // test 1 (basic rotation)
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 2; // test 2
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 1; // test 3
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 2 - gridColumns; // test 4
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 1 + gridColumns * 2; // test 5
            if (tryRotate() === true) {
              return;
            }
            break;
          case 270:
            testOrigin = currentOrigin; // test 1 (basic rotation)
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1; // test 2
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 2; // test 3
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1 + gridColumns * 2; // test 4
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 2 - gridColumns; // test 5
            if (tryRotate() === true) {
              return;
            }
            break;
        }
      }
    } else {
      // * tests for all other blocks
      // rotating left (z key)
      if (event.keyCode === 90) {
        switch (currentBlockRotation) {
          case 0:
            testOrigin = currentOrigin; // test 1 (basic rotation)
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1; // test 2
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1 - gridColumns; // test 3
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + gridColumns * 2; // test 4
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1 + gridColumns * 2; // test 5
            if (tryRotate() === true) {
              return;
            }
            break;
          case 90:
            testOrigin = currentOrigin; // test 1 (basic rotation)
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1; // test 2
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1 + gridColumns; // test 3
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - gridColumns * 2; // test 4
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1 - gridColumns * 2; // test 5
            if (tryRotate() === true) {
              return;
            }
            break;
          case 180:
            testOrigin = currentOrigin;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 1; // test 2
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 1 - gridColumns;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + gridColumns * 2;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 1 + gridColumns * 2;
            if (tryRotate() === true) {
              return;
            }
            break;
          case 270:
            testOrigin = currentOrigin;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 1; // test 2
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 1 + gridColumns;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - gridColumns * 2;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 1 - gridColumns * 2;
            if (tryRotate() === true) {
              return;
            }
            break;
        }
        // rotating right (x key)
      } else if (event.keyCode === 88) {
        switch (currentBlockRotation) {
          case 0:
            testOrigin = currentOrigin;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 1; // test 2
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 1 - gridColumns;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + gridColumns * 2;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 1 + gridColumns * 2;
            if (tryRotate() === true) {
              return;
            }
            break;
          case 90:
            testOrigin = currentOrigin;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1; // test 2
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1 + gridColumns;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - gridColumns * 2;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1 - gridColumns * 2;
            if (tryRotate() === true) {
              return;
            }
            break;
          case 180:
            testOrigin = currentOrigin;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1; // test 2
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1 - gridColumns;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + gridColumns * 2;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1 + gridColumns * 2;
            if (tryRotate() === true) {
              return;
            }
            break;
          case 270:
            testOrigin = currentOrigin;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 1; // test 2
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 1 + gridColumns;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - gridColumns * 2;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 1 - gridColumns * 2;
            if (tryRotate() === true) {
              return;
            }
            break;
        }
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", init);
