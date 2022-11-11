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
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      rot270: [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
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

  const possibleBlocks = ["I", "J", "L", "0", "S", "T", "Z"];
  let currentBlock;
  let currentRotation = 0;

  // serve a block to player by selecting randomly from the above array:
  // function serveBlock() {
  //   currentBlock =
  //     possibleBlocks[Math.floor(Math.random() * (possibleBlocks.length - 1))];
  //   console.log(allBlocks["blockI"]["rot0"]);
  // }

  const spawnOrigin = 3;
  let currentOrigin = spawnOrigin;
  let currentRenderRow = currentOrigin;
  let currentRenderSquare = currentOrigin;

  // serveBlock();
  renderBlock();

  function renderBlock() {
    // select the correct block and its correct rotation to render, using:
    let currentBlockMatrix = allBlocks[`blockJ`][`rot270`];
    console.log(currentBlockMatrix);

    currentRenderRow = currentOrigin;
    currentRenderSquare = currentOrigin;

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
    // use a nested for loop to iterate through the correct matrix and display it on the grid:
    // * start at the currentBlockOrigin.
    // * inner loop then iterates through the first row of the matrix,
    // * each iteration adds a display-square class to the gridsquare,
    // * until the inner loop as finsihed a row.
    // * outer loop then increments the origin by 10 (i.e. moves to the second row),
    // * inner loop iterates again, this time through the second row of the matrix, and so on.
    // and so on, until the outer loop has run 4 times (for the 4 rows of the matrix).

    // could also look at doing the matrix as a flat array - then we just need one for-loop,
    // check if (index % 4 === 0), and if so increment the origin by 10?

    // make sure renderBlock() is called on each "frame" of movement. Can't have it
    // loop across multiple frames, otherwise the block will appear to break apart.

    // If currentGridSquare.classList.contains(occupied), then call
    // a stopMoving() function. Make sure this happens BEFORE the block is rendered -
    // otherwise we'll only find out when we're halfway through rendering the block
    // (as otherwise the earlier lines will move down without "realising" later ones are occupied).
  }

  function fillSquare(position) {
    gridSquares[position].classList.add("filled");
  }

  function clearSquare(position) {
    gridSquares[position].classList.remove("filled");
  }
}

document.addEventListener("DOMContentLoaded", init);
