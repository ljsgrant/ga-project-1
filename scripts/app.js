function init() {
  // build grid on page load

  class Player {
    constructor(
      name,
      score = 0,
      level = 0,
      currentLevelScore = 0,
      rowsTotalUntilLevel,
      rowsRemainingUntilLevel
    ) {
      this.name = name;
      this.score = score;
      this.level = level;
      this.currentLevelScore = currentLevelScore;
      this.rowsTotalUntilLevel = rowsTotalUntilLevel;
      this.rowsRemainingUntilLevel = rowsRemainingUntilLevel;
    }
  }

  const currentPlayer = new Player("Player1");

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
      stats: 0,
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
      stats: 0,
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
      stats: 0,
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
      stats: 0,
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
      stats: 0,
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
      stats: 0,
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
      stats: 0,
    },
  };

  // Grid
  const grid = document.querySelector(".grid");
  const gridCells = [];
  const gridRowCellCount = 14;
  const gridRows = 24;
  const gridCellCount = gridRowCellCount * gridRows;
  const outOfBoundsRowsTop = 2;
  const outOfBoundsRowsBottom = 2;
  const outOfBoundsTopCellCount = gridRowCellCount * outOfBoundsRowsTop;
  const outOfBoundsBottomCellCount = gridRowCellCount * outOfBoundsRowsBottom;

  // blocks
  const possibleBlocks = ["I", "J", "L", "O", "S", "T", "Z"];
  let currentBlock = null;
  let nextBlock;
  let currentBlockRotation = 0;
  let currentBlockMatrix; 
  const matrixHeight = 4;
  const matrixWidth = 4;
  const spawnOrigin = 33; 
  let currentOrigin = spawnOrigin; 
  let currentRenderRow; 
  let currentRenderCell; 

  // use for rotation tests
  let testOrigin; 
  let currentTestBlockRotation;
  let testBlockMatrix;

  // block fall
  let fallTimer; 
  const startingSpeed = 800; // higher = slower.
  let blockFallSpeed = startingSpeed; // higher = slower.
  const levelSpeedIncrease = 50; 
  let obstructedCells; 

  // user inputs
  const moveRightKey = "ArrowRight";
  const moveLeftKey = "ArrowLeft";
  const moveDownKey = "ArrowDown";
  const rotateRightKey = 88;
  const rotateLeftKey = 90;

  // "next block" display
  const miniGrid = document.querySelector(".mini-grid");
  let nextBlockMatrix;

  // UI elements
  const gridOverlay = document.querySelector(".grid-overlay");
  const playButton = document.querySelector(".play-button");
  const nextLevelButton = document.querySelector(".next-level-button");
  const playAgainButton = document.querySelector(".play-again-button");
  const overlayMessage = document.querySelector(".grid-overlay_message");
  const rowsRemainingDisplay = document.querySelector(".rows-remaining");
  const levelDisplay = document.querySelector(".level");

  playButton.addEventListener("click", startGame);
  playAgainButton.addEventListener("click", startGame);

  function buildGrid() {
    clearGrid();

    for (let index = 0; index < gridCellCount; index++) {
      const gridCell = document.createElement("div");
      gridCell.setAttribute("data-index", index);
      if (index < outOfBoundsTopCellCount) {
        gridCell.classList.add("top-of-grid", "out-of-bounds");
      }
      if ((index - 2) % gridRowCellCount === 0) {
        gridCell.classList.add("left-bounds");
      }
      if ((index + 3) % gridRowCellCount === 0) {
        gridCell.classList.add("right-bounds");
      }
      if (index > gridCellCount - (outOfBoundsBottomCellCount + 1)) {
        gridCell.classList.add("bottom-bounds", "out-of-bounds");
      }
      if (
        index % gridRowCellCount === 0 ||
        (index - 1) % gridRowCellCount === 0 ||
        (index + 1) % gridRowCellCount === 0 ||
        (index + 2) % gridRowCellCount === 0
      ) {
        gridCell.classList.add("out-of-bounds");
      }
      // gridCell.textContent = index;
      gridCells.push(gridCell);
      grid.appendChild(gridCell);
    }
    function clearGrid() {
      gridCells.length = 0;
      grid.innerHTML = null;
    }
  }

  function setBlockMatrix() {
    currentBlockMatrix =
      allBlocks[`block${currentBlock}`][`rot${currentBlockRotation}`];
  }

  function resetBlockProperties() {
    currentBlockRotation = 0;
    currentOrigin = spawnOrigin;
    currentRenderRow = spawnOrigin;
    currentRenderCell = spawnOrigin;
  }

  function startGame() {
    buildGrid();

    window.addEventListener("keydown", moveBlock);
    window.addEventListener("keydown", testRotation);

    currentPlayer.level = 0;
    blockFallSpeed = startingSpeed;

    currentPlayer.rowsTotalUntilLevel = currentPlayer.level * 10 + 10;
    currentPlayer.rowsRemainingUntilLevel = currentPlayer.rowsTotalUntilLevel;
    levelDisplay.textContent = currentPlayer.level;
    rowsRemainingDisplay.textContent = currentPlayer.rowsRemainingUntilLevel;
    gridOverlay.style.backgroundColor = "rgba(0, 119, 255, 0.662)";
    overlayMessage.innerText = "Get Ready!";
    playButton.style.display = "none";
    playAgainButton.style.display = "none";
    nextLevelButton.style.display = "none";
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

  function newBlock() {
    resetBlockProperties();
    serveBlock();
    updateStats();
    buildMiniGrid();
    renderNewPosition("active-block");
    blockFall();
  }

  function gameOver() {
    clearInterval(fallTimer);
    window.removeEventListener("keydown", moveBlock);
    window.removeEventListener("keydown", testRotation);
    overlayMessage.innerText = "Game Over!";
    playAgainButton.style.display = "flex";
    gridOverlay.style.backgroundColor = "rgba(255, 0, 106, 0.662)";
    gridOverlay.style.display = "flex";
  }

  function checkForLevelUp() {
    if (currentPlayer.rowsRemainingUntilLevel === 0) {
      currentPlayer.level++;
      levelDisplay.textContent = currentPlayer.level;
      currentPlayer.rowsTotalUntilLevel = currentPlayer.level * 10 + 10;
      currentPlayer.rowsRemainingUntilLevel = currentPlayer.rowsTotalUntilLevel;
      rowsRemainingDisplay.textContent = currentPlayer.rowsRemainingUntilLevel;
      blockFallSpeed -= levelSpeedIncrease;

      // clearInterval(fallTimer);
      // gridOverlay.style.display = "flex";
      // overlayMessage.textContent = "Level Clear!";
      // nextLevelButton.style.display = "flex";
    }
  }

  function checkForGameOver() {
    if (currentBlock !== "I" && currentOrigin < gridRowCellCount * 3) {
      return true;
    } else if (currentBlock === "I" && currentOrigin < gridRowCellCount * 2) {
      return true;
    } else {
      return false;
    }
  }

  function updateStats() {
    allBlocks[`block${currentBlock}`].stats++;
    document.querySelector(`.${currentBlock}-stats`).textContent =
      allBlocks[`block${currentBlock}`].stats;
  }

  function serveBlock() {
    if (currentBlock === null) {
      currentBlock =
        possibleBlocks[Math.round(Math.random() * (possibleBlocks.length - 1))];
    } else {
      currentBlock = nextBlock;
    }
    nextBlock =
      possibleBlocks[Math.round(Math.random() * (possibleBlocks.length - 1))];
    setBlockMatrix();
    // fixes the spawn origin for I-block, which spawns with a blank top row of its matrix
    if (currentBlock === "I") {
      currentOrigin = spawnOrigin - gridRowCellCount;
    } else {
      currentOrigin = spawnOrigin;
    }
  }

  function moveBlockDown() {
    if (
      checkObstructedCellsBelow() === 0 &&
      document.querySelectorAll(".active-block.bottom-bounds").length === 0
    ) {
      clearOldPosition();
      currentOrigin += gridRowCellCount;
      renderNewPosition("active-block");
    }
  }

  function getCurrentActiveCells(classSelector = ".active-block") {
    return Array.from(document.querySelectorAll(classSelector));
  }

  function checkObstructedCellsBelow() {
    const currentActiveCells = getCurrentActiveCells();
    obstructedCells = 0;
    currentActiveCells.forEach((activeCell) => {
      const cellBelow = parseInt(activeCell.dataset.index) + gridRowCellCount;
      if (
        gridCells[cellBelow].classList.contains("bottom-bounds") ||
        gridCells[cellBelow].classList.contains("static-block")
      ) {
        obstructedCells++;
      }
    });
    return obstructedCells;
  }

  function blockFall() {
    fallTimer = setInterval(() => {
      const currentActiveCells = getCurrentActiveCells();
      if (checkObstructedCellsBelow() === 0) {
        moveBlockDown();
      } else {
        clearInterval(fallTimer);
        clearOldPosition();
        // add to stack:
        addToStack(currentActiveCells);
        clearRows();
        if (checkForGameOver() === true) {
          gameOver();
          return;
        } else {
          checkForLevelUp();
          newBlock();
          return;
        }
      }
    }, blockFallSpeed);

    function addToStack(currentActiveCells) {
      currentActiveCells.forEach((activeCell) =>
        gridCells[activeCell.dataset.index].classList.add(
          "static-block",
          `block-${currentBlock}`
        )
      );
    }
  }

  function clearRows() {
    for (
      let index = parseInt(
        gridCells[gridCells.length - gridRowCellCount * 3 + 2].dataset.index
      ); // index starts at the lowest lefthand corner of the playable grid
      index >= gridRowCellCount * 2; // loop will stop before entering the top-bounds
      index -= gridRowCellCount // go up by one row each iteration
    ) {
      const rowToCheck = gridCells.slice(index, index + 10);
      if (rowToCheck.every((cell) => cell.classList.contains("static-block"))) {
        // remove the complete row
        rowToCheck.forEach((cell) =>
          cell.classList.remove(
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
        allStaticBlocks.forEach((cell) => {
          if (parseInt(cell.dataset.index) < index) {
            blocksToMoveDown.push(cell);
          }
        });

        // make sure we're starting from the bottom-right cell and working backwards & upwards:
        blocksToMoveDown = blocksToMoveDown.reverse();
        // move the blocks down
        blocksToMoveDown.forEach((cell) => {
          const cellClasses = Array.from(cell.classList);
          cell.classList.remove(
            "static-block",
            "block-I",
            "block-O",
            "block-T",
            "block-S",
            "block-J",
            "block-Z",
            "block-L"
          );

          const cellBelow =
            gridCells[parseInt(cell.dataset.index) + gridRowCellCount];
          cellClasses.forEach((cellClass) =>
            cellBelow.classList.add(cellClass)
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
    currentPlayer.rowsRemainingUntilLevel--;
    rowsRemainingDisplay.textContent = currentPlayer.rowsRemainingUntilLevel;
  }

  function moveBlock(event) {
    const currentActiveCells = getCurrentActiveCells();
    obstructedCells = 0;

    switch (event.key) {
      case moveLeftKey:
        move("left");
        break;
      case moveRightKey:
        move("right");
        break;
      case moveDownKey:
        moveBlockDown();
        break;
    }
    function move(direction) {
      currentActiveCells.forEach((activeCell) => {
        let cellNeighbour;
        if (direction === "left") {
          cellNeighbour = parseInt(activeCell.dataset.index) - 1;
        } else if (direction === "right") {
          cellNeighbour = parseInt(activeCell.dataset.index) + 1;
        } else {
          throw "moveBlock() expects a direction (\"left\" or \"right\") as an argument! ";
        }
        if (gridCells[cellNeighbour].classList.contains("static-block")) {
          obstructedCells++;
        }
      });
      if (
        obstructedCells === 0 &&
        document.querySelectorAll(`.active-block.${direction}-bounds`)
          .length === 0
      ) {
        clearOldPosition();
        if (direction === "left") {
          currentOrigin -= 1;
        } else if (direction === "right") {
          currentOrigin += 1;
        }
        renderNewPosition("active-block");
      }
    }
  }

  function rotateBlock(keyCode) {
    if (obstructedCells === 0) {
      switch (keyCode) {
        // z key to rotate left
        case rotateLeftKey:
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
        case rotateRightKey:
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
    currentRenderCell = origin;
    for (let indexOuter = 0; indexOuter < matrixHeight; indexOuter++) {
      currentRenderCell = currentRenderRow;
      for (let indexInner = 0; indexInner < matrixWidth; indexInner++) {
        if (blockMatrix[indexOuter][indexInner] === 1) {
          gridCells[currentRenderCell].classList.add(classSelector);
          if (classSelector === "active-block") {
            gridCells[currentRenderCell].classList.add(`block-${currentBlock}`);
          }
        }
        currentRenderCell++;
      }
      currentRenderRow += gridRowCellCount;
    }
  }

  function clearOldPosition(
    classSelector = "active-block",
    origin = currentOrigin
  ) {
    currentRenderRow = origin;
    currentRenderCell = origin;
    for (let indexOuter = 0; indexOuter < matrixHeight; indexOuter++) {
      currentRenderCell = currentRenderRow;
      for (let indexInner = 0; indexInner < matrixWidth; indexInner++) {
        if (gridCells[currentRenderCell] !== undefined) {
          if (gridCells[currentRenderCell].classList.contains(classSelector)) {
            gridCells[currentRenderCell].classList.remove(classSelector);
            if (classSelector === "active-block") {
              gridCells[currentRenderCell].classList.remove(
                `block-${currentBlock}`
              );
            }
          }
        }
        currentRenderCell++;
      }
      currentRenderRow += gridRowCellCount;
    }
  }

  function setTestBlockMatrix() {
    testBlockMatrix =
      allBlocks[`block${currentBlock}`][`rot${currentTestBlockRotation}`];
  }

  function testRotation(event) {
    let occupiedCells;
    let outOfBoundsCells;

    // set test rotation according to which way player wants to rotate
    switch (event.keyCode) {
      case rotateLeftKey:
        if (currentBlockRotation === 0) {
          currentTestBlockRotation = 270;
        } else {
          currentTestBlockRotation = currentBlockRotation - 90;
        }
        break;
      case rotateRightKey:
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
      outOfBoundsCells = document.querySelectorAll(
        ".block-rotate-test.out-of-bounds"
      );
      occupiedCells = document.querySelectorAll(
        ".block-rotate-test.static-block"
      );
      clearOldPosition("block-rotate-test", testOrigin);
      if (outOfBoundsCells.length === 0 && occupiedCells.length === 0) {
        clearOldPosition();
        currentOrigin = testOrigin;
        rotateBlock(event.keyCode);
        return true;
      } else {
        outOfBoundsCells = null;
        occupiedCells = null;
      }
    }

    if (currentBlock === "O") {
      // * we don't try rotation for blockO, all states are the same
      return;
    } else if (currentBlock === "I") {
      // * tests for I
      // rotating left (z key)
      if (event.keyCode === rotateLeftKey) {
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
            testOrigin = currentOrigin - 1 - gridRowCellCount * 2; // test 4
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 2 + gridRowCellCount; // test 5
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
            testOrigin = currentOrigin + 2 - gridRowCellCount; // test 4
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 1 + gridRowCellCount * 2; // test 5
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
            testOrigin = currentOrigin + 1 + gridRowCellCount * 2; // test 4
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 2 - gridRowCellCount; // test 5
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
            testOrigin = currentOrigin - 2 + gridRowCellCount; // test 4
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1 - gridRowCellCount * 2; // test 5
            if (tryRotate() === true) {
              return;
            }
            break;
        }
        // rotating right (x key)
      } else if (event.keyCode === rotateRightKey) {
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
            testOrigin = currentOrigin - 2 + gridRowCellCount; // test 4
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1 - gridRowCellCount * 2; // test 5
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
            testOrigin = currentOrigin - 1 - gridRowCellCount * 2; // test 4
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 2 + gridRowCellCount; // test 5
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
            testOrigin = currentOrigin + 2 - gridRowCellCount; // test 4
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 1 + gridRowCellCount * 2; // test 5
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
            testOrigin = currentOrigin + 1 + gridRowCellCount * 2; // test 4
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 2 - gridRowCellCount; // test 5
            if (tryRotate() === true) {
              return;
            }
            break;
        }
      }
    } else {
      // * tests for all other blocks
      // rotating left (z key)
      if (event.keyCode === rotateLeftKey) {
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
            testOrigin = currentOrigin + 1 - gridRowCellCount; // test 3
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + gridRowCellCount * 2; // test 4
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1 + gridRowCellCount * 2; // test 5
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
            testOrigin = currentOrigin + 1 + gridRowCellCount; // test 3
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - gridRowCellCount * 2; // test 4
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1 - gridRowCellCount * 2; // test 5
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
            testOrigin = currentOrigin - 1 - gridRowCellCount;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + gridRowCellCount * 2;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 1 + gridRowCellCount * 2;
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
            testOrigin = currentOrigin - 1 + gridRowCellCount;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - gridRowCellCount * 2;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 1 - gridRowCellCount * 2;
            if (tryRotate() === true) {
              return;
            }
            break;
        }
        // rotating right (x key)
      } else if (event.keyCode === rotateRightKey) {
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
            testOrigin = currentOrigin - 1 - gridRowCellCount;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + gridRowCellCount * 2;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 1 + gridRowCellCount * 2;
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
            testOrigin = currentOrigin + 1 + gridRowCellCount;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - gridRowCellCount * 2;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1 - gridRowCellCount * 2;
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
            testOrigin = currentOrigin + 1 - gridRowCellCount;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + gridRowCellCount * 2;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1 + gridRowCellCount * 2;
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
            testOrigin = currentOrigin - 1 + gridRowCellCount;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - gridRowCellCount * 2;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin - 1 - gridRowCellCount * 2;
            if (tryRotate() === true) {
              return;
            }
            break;
        }
      }
    }
  }

  function buildMiniGrid() {
    // const miniGridCells = [];
    setNextBlockMatrix();
    miniGrid.innerHTML = null;
    const miniGridCellCount = 8;
    for (let i = 0; i < miniGridCellCount; i++) {
      const miniGridCell = document.createElement("div");
      if (nextBlockMatrix.flat()[i] === 1) {
        miniGridCell.classList.add(`block-${nextBlock}`);
      }
      miniGrid.appendChild(miniGridCell);
    }
    function setNextBlockMatrix() {
      nextBlockMatrix = allBlocks[`block${nextBlock}`]["rot0"];
    }
  }
}

document.addEventListener("DOMContentLoaded", init);
