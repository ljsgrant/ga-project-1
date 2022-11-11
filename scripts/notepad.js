const allBlocks = {
  blockI: {
    // start with the grid index of top-left square
    // in the matrix.
    // Use for loop to iterate through the matrix,
    // if matrix value is 1 then display a square,
    // if value is 0 then don't display a square.
    // Once all squares in the matrix are displaying,
    // then we have a rendered block.
    rot0: [
      0, 0, 0, 0,
      // then we +10 to the origin to get the start index
      // of the next row
      1, 1, 1, 1,
      // row start = origin + 20
      0, 0, 0, 0,
      // row start = origin + 30
      0, 0, 0, 0,
    ],
    rot90: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    rot180: [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    rot270: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
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
console.log("Block matrix fetch test: ", allBlocks.blockI.rot270);

// ! Change the below so the origin starts at bottom left and works upwards?
// ! That way we know if the bottom row is occupied (and shape should stop falling)
// ! before rendering the shape - but maybe doesn't matter as we loop through the
// ! shape before rendering.

// Block matrix is always a 4x4 grid,
// blocks always spawn wholly on the screen,
// and blocks are always centered.
// The origin is the top-left square of the block matrix,
// so the matrix will always start rendering the block at index 3
// on the grid. So:
const spawnOrigin = 3;
let currentOrigin;

// when moving blocks left, right or down, we just need to update the currentBlockOrigin
// and then call renderBlock() with the new origin and the array matrix for the current block
// and its rotation.
// Will also:
// * remove an occupied class from all the current squares in the matrix,
// * after moving the block, add the occupied class to the new squares

function renderBlock(blockMatrixArray, currentBlockOrigin) {
  // select the correct block and its correct rotation to render, using:
  blockMatrixArray = allBlocks[`block${currentBlock}`][`rot${currentRotation}`];
  // get the current square at index
  for (let indexOuter = 0; indexOuter < 4; indexOuter++) {
    currentSquare;
    for (let indexInner = 0; indexInner < array.length; indexInner++) {}
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

// have an array of the different tetris blocks,
const possibleBlocks = ["I", "J", "L", "0", "S", "T", "Z"];
// then will choose a block to deliver to the player by selecting randomly from the array:
let currentBlock =
  possibleBlocks[Math.floor(Math.random) * possibleBlocks.length - 1];
let currentRotation = 0;

function rotateBlock() {
  // will be conditional here to fetch the correct
  switch (currentRotation) {
    case 0:
      // * fetch the correct block matrix
      // * call the renderBlock function
      break;
    case 90:
      break;
  }
}

//#region Moving Blocks

// call when keypress = right arrow
function moveBlockRight() {
  displayBlock(blockMatrixArray + 1);
}

// call when keypress = left arrow
function moveBlockLeft() {
  displayBlock(blockMatrixArray - 1);
}

// all this every frame using SetInterval.
function moveBlockDown() {
  displayBlock(blockMatrixArray + 10);
}

//#endregion
