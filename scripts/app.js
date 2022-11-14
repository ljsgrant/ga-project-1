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
  let currentTestBlock; // will use for rotation tests
  let currentTestBlockRotation; // will use for rotation tests
  let testBlockMatrix; // use for test rotation before performing basic rotation or wall kick

  let fallTimer; // cancel this to end current block fall
  let blockFallSpeed = 500; // will increase this as player advances in levels and/or when player performs a soft drop
  let obstructedSquares; // will use to check if block can continue falling

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
    renderNewPosition("active-block");
    blockFall();
  }
  // give the player a block on page load (change to game start later)
  newBlock();

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
        // console.log("not there yet");
        moveBlockDown();
      } else {
        // console.log("reached the bottom!");
        clearInterval(fallTimer);
        clearOldPosition();
        currentActiveSquares.forEach((activeSquare) =>
          gridSquares[activeSquare.dataset.index].classList.add("static-block")
        );
        clearRows();
        if (checkForGameOver() === true) {
          console.log("game over?!");
          return;
        } else {
          newBlock();
          return;
        }
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

  // ****************************************************************

  // currentTestBlock
  // testBlockMatrix
  // currentTestBlockRotation

  function setTestBlockMatrix() {
    testBlockMatrix =
      allBlocks[`block${currentBlock}`][`rot${currentTestBlockRotation}`];
  }

  function checkIfTestIsObstructed() {
    let currentTestSquares = null;
    currentTestSquares = getCurrentActiveSquares(".block-rotate-test");
    console.log(currentTestSquares);
    obstructedSquares = 0;
    // check if any of the squares below the current block are occupied
    currentTestSquares.forEach((testSquare) => {
      // if it's intersecting with a static-block or out-of-bounds, make obstructedSquares non-zero
      if (
        gridSquares[testSquare].classList.contains("out-of-bounds") ||
        gridSquares[testSquare].classList.contains("static-block")
      ) {
        obstructedSquares++;
      }
    });
    return obstructedSquares;
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

    if (currentBlock === "O") {
      // don't try rotation for blockO, all states are the same
      return;
    } else if (currentBlock === "I") {
      // tests for I
    } else {
      // tests for all other pieces

      if (event.keyCode === 90) {
        switch (currentBlockRotation) {
          case 0:
            // * test case 1 (basic rotation)
            testOrigin = currentOrigin;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            console.log("0-1");
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 2
            testOrigin = currentOrigin + 1; // test 2
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            console.log("0-2");
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 3
            testOrigin = currentOrigin + 1 - gridColumns;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            console.log("0-3");
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 4
            testOrigin = currentOrigin + gridColumns * 2;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            console.log("0-4");
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 5
            testOrigin = currentOrigin + 1 + gridColumns * 2;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            console.log("0-5");
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }
            // * if all the above fail, we simply don't perform a rotation.
            break;
          case 90:
            // * test case 1 (basic rotation)
            testOrigin = currentOrigin;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            console.log("90-1");
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 2
            testOrigin = currentOrigin + 1; // test 2
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            console.log("90-2");
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 3
            testOrigin = currentOrigin + 1 + gridColumns;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            console.log("90-3");
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 4
            testOrigin = currentOrigin - gridColumns * 2;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            console.log("90-4");
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 5
            testOrigin = currentOrigin + 1 - gridColumns * 2;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            console.log("90-5");
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }
            break;
          case 180:
            // * test case 1 (basic rotation)
            testOrigin = currentOrigin;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            console.log("180-1");
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 2
            testOrigin = currentOrigin - 1; // test 2
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            console.log("180-2");
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 3
            testOrigin = currentOrigin - 1 - gridColumns;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            console.log("180-3");
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 4
            testOrigin = currentOrigin + gridColumns * 2;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            console.log("180-4");
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 5
            testOrigin = currentOrigin - 1 + gridColumns * 2;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            console.log("180-5");
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }
            break;
          case 270:
            // * test case 1 (basic rotation)
            testOrigin = currentOrigin;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            console.log("270-1");
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 2
            testOrigin = currentOrigin - 1; // test 2
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            console.log("270-2");
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 3
            testOrigin = currentOrigin - 1 + gridColumns;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            console.log("270-3");
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 4
            testOrigin = currentOrigin - gridColumns * 2;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            console.log("270-4");
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 5
            testOrigin = currentOrigin - 1 - gridColumns * 2;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            console.log("270-5");
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }
            break;
        }
      } else if (event.keyCode === 88){
        switch (currentBlockRotation) {
          case 0:
            // * test case 1 (basic rotation)
            testOrigin = currentOrigin;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 2
            testOrigin = currentOrigin - 1; // test 2
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 3
            testOrigin = currentOrigin - 1 - gridColumns;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 4
            testOrigin = currentOrigin + gridColumns * 2;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 5
            testOrigin = currentOrigin - 1 + gridColumns * 2;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }
            // * if all the above fail, we simply don't perform a rotation.
            break;
          case 90:
            // * test case 1 (basic rotation)
            testOrigin = currentOrigin;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 2
            testOrigin = currentOrigin + 1; // test 2
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 3
            testOrigin = currentOrigin + 1 + gridColumns;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 4
            testOrigin = currentOrigin - gridColumns * 2;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 5
            testOrigin = currentOrigin + 1 - gridColumns * 2;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }
            break;
          case 180:
            // * test case 1 (basic rotation)
            testOrigin = currentOrigin;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 2
            testOrigin = currentOrigin + 1; // test 2
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 3
            testOrigin = currentOrigin + 1 - gridColumns;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 4
            testOrigin = currentOrigin + gridColumns * 2;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 5
            testOrigin = currentOrigin + 1 + gridColumns * 2;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }
            break;
          case 270:
            // * test case 1 (basic rotation)
            testOrigin = currentOrigin;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 2
            testOrigin = currentOrigin - 1; // test 2
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 3
            testOrigin = currentOrigin - 1 + gridColumns;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 4
            testOrigin = currentOrigin - gridColumns * 2;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }

            // * test case 5
            testOrigin = currentOrigin - 1 - gridColumns * 2;
            renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
            outOfBoundsSquares = document.querySelectorAll(
              ".block-rotate-test.out-of-bounds"
            );
            occupiedSquares = document.querySelectorAll(
              ".block-rotate-test.static-block"
            );
            clearOldPosition("block-rotate-test", testOrigin);
            if (
              outOfBoundsSquares.length === 0 &&
              occupiedSquares.length === 0
            ) {
              clearOldPosition();
              currentOrigin = testOrigin;
              rotateBlock(event.keyCode);
              return;
            } else {
              outOfBoundsSquares = null;
              occupiedSquares = null;
            }
            break;
        }
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

  // ****************************************************************

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
          }
        }
        currentRenderSquare++;
      }
      currentRenderRow += gridColumns;
    }
  }

  window.addEventListener("keydown", moveBlock);
  window.addEventListener("keydown", testRotation);
}

document.addEventListener("DOMContentLoaded", init);
