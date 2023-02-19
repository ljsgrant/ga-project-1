# Building Tetris with Javascript, HTML & CSS: Project 1, Software Engineering Immersive with General Assembly

## Description & Deployment Link

This was my first module project for the Software Engineering Immersive course with General Assembly, using HTML, CSS and JavaScript to build a classic game from scratch over the course of one week, to be deployed online and playable in the browser.

### Link to Deployed Game:

https://ljsgrant.github.io/ga-project-1/

![screengrab of finished project](assets/images/readme/project-1.png 'Tetris')

<br>

---

<br>

# Write-up of Build Process

## Contents

- **[Technologies Used](#technologies-used)**<br/>
- **[Brief](#brief)**<br/>
- **[Planning](#planning)**<br/>
  - [Research](#research)<br/>
  - [To-Do List of features](#to-do-list-of-features)<br/>
  - [Pseudocoding](#pseudocoding)<br/>
- **[Build / Code Process](#buildcode-process)**<br/>
  - [Building the Play Grid](#building-the-play-grid)<br/>
  - [Rendering Blocks](#rendering-blocks)<br/>
  - [Basic Movement](#basic-movement)<br/>
  - [Falling Blocks](#falling-blocks)<br/>
  - [Limiting Block Movement & Adding Blocks to the Stack](#limiting-block-movement--adding-blocks-to-the-stack)<br/>
  - [Basic Rotation](#basic-rotation)<br/>
  - [Clearing Rows](#clearing-rows)<br/>
  - [Game Over](#game-over)<br/>
  - [Giving Blocks Different Colours](#giving-blocks-different-colours)<br/>
  - [Advanced Rotation: adding Wall Kicks](#advanced-rotation-adding-wall-kicks)<br/>
  - [Styling & Bonus Functionality](#styling--bonus-functionality)<br/>
- **[Challenges](#challenges)**<br/>
- **[Wins](#wins)**<br/>
- **[Key Takeaways](#key-takeaways)**<br/>
- **[Bugs](#bugs)**<br/>
- **[Future Improvements](#future-improvements)**<br/>

<br>

---

## Technologies Used

- HTML
- CSS
- JavaScript
- Git
- GitHub
- Chrome Developer Tools
- VSCode

<br>

---

## Brief

The overall brief was to:

>Build a version of a classic arcade game using JavaScript, HTML and CSS, using DOM manipulation for the game mechanics, and to be playable in the browser and deployed online.

Students were then given a choice from a selection of different games, ranked in order of expected difficulty of execution – I chose Tetris, which was listed as one of the harder options, as I wanted to challenge myself and test the skills I had developed over the first few weeks of the course. The brief for Tetris was as follows:


> Tetris
>
> A puzzle game where the player has to fit different shaped blocks together so that they make a complete line across the playing board. Once a line is achieved it is removed from the game board and the player's score is increased. The player can move the blocks left and right and rotate them clockwise in 90º increments. The aim of the game is to get as many points as possible before the game board is filled with blocks.
> 
> Required Functionality:
>
>  - The game should stop if a Tetrimino fills the highest row of the game board
>  - The player should be able to rotate each Tetrimino about its own axis
>  - If a line is completed it should be removed and the pieces above should take its place
>
> Bonus Functionality:
>
>  - Responsive design
>  - Speed increases over time
>  - Persistent leaderboard using localStorage

<br>

---

## Planning

### Research

I began by doing general research into Tetris, and found that there are fairly clear guidelines for how official Tetris games should play (as covered here: [tetris.wiki/Tetris_Guideline](https://tetris.wiki/Tetris_Guideline)). Although I was aiming to fulfil the brief provided rather than to make an official Tetris game with perfect accuracy, I decided to default to the guidelines if in any doubt over how a given feature should behave, rather than wasting time reinventing the wheel for tried-and-tested features. This really helped me on how to approach each piece of logic, and most crucially for how to handle rotation when a block is obstructed by a wall or other blocks, using the “wall kick” functionality.

### To-Do List of features

I listed key features from the brief and added a couple of extras from my research. I worked out a rough order in which to tackle them, taking both importance and expected difficulty into account, ensuring I was managing my time effectively: prioritising essential features but also allowing more time to tackle tougher problems.

My list broke down as:
* Get the blocks to render on screen
* Basic Movement
* Falling Blocks
* Basic Rotation
* Stop blocks when they reach the bottom of the grid or the stack
* Add falling block to the stack at bottom
* Removing completed lines
* Game over when the stack reaches the top row
* Advanced rotation with wall kicks (I expected this to be complex, but decided I could live without it - I would prioritise other more crucial features. My backup plan was to just disallow a rotation if block was next to the wall or another block.)

I also wrote down a few key stretch goals:
A levelling-up mechanic, to track the player’s progress and speed up block fall speed with each level;
The classic “next block” feature, allowing the player to see which block will fall after the current one, meaning they can plan a more effective strategy;
Audio to bring the game to life.

### Pseudocoding

#### Wireframe

I made a basic wireframe to better visualise the play grid and how blocks could move on it, then worked through each item on my to-do list with pseudocode, making sure I had a plan for how to tackle each problem before I started to code for real.
￼
![wireframe of page layout and tetris play grid](assets/images/readme/project-1-wireframe.png 'Wireframe')

#### Rendering Blocks and Basic Rotation

For basic rotation, I considered two options:
* One approach using calculations where each square of a block is translated around the origin to produce a rotation effect:
￼
![planning rotation](assets/images/readme/project-1-planning-rotation.png 'Planning Rotation')

* The other approach would be hard-coding each block as an array matrix, where each cell in a 3x3 or 4x4 grid is either rendered (if the value is 1) or not rendered (if the value is 0):
￼
![planning rotation](assets/images/readme/project-1-planning-rotation-2.png 'Planning Rotation')

I decided to go with the second option as the blocks never change beyond 4 rotation states and there aren’t an excessive quantity of them to hard-code. It also means we don’t have to worry about rotation origins being different for different blocks, and I expected a bonus to be easier debugging: it’s easy to “see” each rotation of the block when looking at the matrices, and therefore easy to check expected behaviour and make changes by “drawing” the block with 1s and 0s. An obvious downside is the additional lines of code this takes up, but I figured the tradeoff was worth it as I could press on with adding more complex functionality rather than spending time on rotation calculations for a non-dynamic set of blocks.

#### Block Movement

I settled on the grid being an array of divs, so moving the block right would mean incrementing each cell’s index by 1, moving left would decrement by 1, and moving down would increment by an amount equal to the number of cells in a row. (In hindsight I believe there was a better way to do this – more on this in the build process).

![planning block movement](assets/images/readme/project-1-planning-origins.png 'Planning Block Movement')
￼
I planned to track the block’s position using a `currentOrigin` variable, which would be the top-left corner of the block matrix. `currentOrigin` would start equal to a const `spawnOrigin` when a block first appears, and then be incremented or decremented to move the block.

#### Limiting left/right movement

To stop the blocks moving off the edges of the play grid, I planned to add a “bounds” class to the leftmost and rightmost columns. If any cells contained the block class and a bounds class, I would disallow further movement in that direction. I also planned to use a similar method to stop blocks at the bottom of the play grid.

![planning block movement](assets/images/readme/project-1-planning-stop-at-bounds.png 'Planning')

#### Stopping at the Stack

I knew I would need CSS classes for each type of block to render it on screen, but also opted to have a generalised static-block class, so I could do a single check for if the active-block was about to move into an occupied cell.
￼

<br>

---

## Build/Code Process

### Building the Play Grid

I began by creating a standard Tetris play grid of 10x20 playable cells, writing a `buildGrid()` function with a for loop that creates divs, gives them a data-index attribute that increments by 1 with each iteration, pushes them onto a `gridCells` array, and then adds them to a grid parent element in the DOM with `element.appendChild()`. This way each cell in the grid can be targeted with its data-index. Also I could assign CSS classes to rows and columns, which would be useful for adding “bounds” classes to the rows and columns at the edge of the grid.

In hindsight I think it would have been better to build the grid with a parent array of rows, and nested sub-arrays for the cells in each row, making it simpler to keep track of rows and their cells separately, making for more readable code vs. messier calculations to check if a cell is at the left, right, top or bottom of the grid. This is a key area I want to go back and rework.

### Rendering Blocks

Having planned to hard-code each block and its rotations, I built an object for my block matrices, with a child object for each block that held 4 array matrices for each of the block’s rotation-states. Then I could basically sketch out the blocks with 1s and 0s: if the value at a given index === 1, it will render as part of the block; a 0 will be an empty square. For example here are the four rotation-states for the “I” block:

``` js
blockI: {
  rot0: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  rot90: [
  [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0]
  ],
  rot180: [
  [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0]
  ],
  rot270: [
  [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ]
}
```

Next I wrote a `renderNewPosition()` function to loop through the current block’s matrix and a corresponding 4x4 pattern of cells on the play grid.  The function begins looping at an index on the grid equal to the value of a `currentOrigin` variable. An outer for loop keeps track of rows by incrementing a `currentRenderRow` variable with each iteration, while an inner loop moves along the row by incrementing a `currentRenderCell` variable and adding an active-block CSS class to any grid cells which correspond to a “1” value in the block matrix:

``` js
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
  if (blockMatrix[indexOuter][indexinner] === 1) {
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
```

### Basic Movement

With the `renderNewPosition()` function, basic movement is as easy as incrementing/decrementing the `currentOrigin` in the direction of movement and calling `renderNewPosition()`. However this alone doesn’t clear the block’s old position,  meaning initially a block left a trail on the grid whenever it moved. I took care of this with a `clearOldPosition()` function, which basically does the reverse of `renderNewPosition()`, calling `classList.remove()` to clear the active block from the grid.

To put all of this into practice I wrote a `moveBlock()` function which checks which arrow key the player presses, and calls a child function for the direction of movement: this in turn calls `clearOldPosition()`, increments or decrements `currentOrigin`, and then calls `renderNewPosition()`. Now the block correctly moves in the player’s chosen direction!

### Falling Blocks

To make the blocks move down the grid of their own accord, I wrote a `blockFall()` function with a `setInterval()` to repeatedly call  `moveBlockDown()`. The speed the block falls at is controlled by a `blockFallSpeed` const, allowing me to change the speed programmatically and giving the option to later increase the speed as the player progresses through levels.

### Limiting Block Movement & Adding Blocks to the Stack

The block could now move but the basic movement allowed it to move “off the edge” of the grid. As the grid is a flat array, this resulted in blocks disappearing off one side and appearing on the opposite side of the grid.  Also when falling blocks reached the bottom of the grid, the interval would keep firing `blockFall()` and move the block to indices greater than the length of the `gridCells` array, throwing a game-breaking error as `renderNewPositon()` tries to loop over undefined indices greater than the length of the array.

To fix this I went back to my `buildGrid()` function and added `left-bounds`, `right-bounds` and `bottom-bounds` CSS classes to the outermost columns of the grid using the modulo operator, e.g.:

``` js
if ((index - 2) % gridRowCellCount === 0) {
  gridCell.classList.add("left-bounds");
      }
      if ((index + 3) % gridRowCellCount === 0) {
  gridCell.classList.add("right-bounds");
      }
```

![bounds cells](assets/images/readme/project-1-out-of-bounds.png 'Bounds cells')


Now before moving the block left or right, we can check if the `active-block` is occupying any cells which also have the `left-bounds` or `right-bounds` class. I also added a `checkObstructedCellsBelow()` function to return the number of cells below the active block which contain the `bottom-bounds` or a static block. If this returns zero, we continue to fire `moveBlockDown()` from `blockFall()`.

### Adding Blocks to the Stack

If `checkObstructedCellsBelow()` returns anything other than zero, `blockFall()` will clear the `fallTimer`, remove the `active-block` class from the grid, and call an `addToStack()` function to add the `static-block` class to the same cells:

``` js
if (checkObstructedCellsBelow() === 0) {
  moveBlockDown();
      } else {
  clearInterval(fallTimer);
        clearOldPosition();
        addToStack(currentActiveCells);
        clearRows();
}
```

Once I had blocks adding themselves to the stack, I went back and added code to check if there are any static blocks to the left or right of the `active-block` cells in the direction of movement. If there are, we increment `obstructedCells`:

``` js
if (gridCells[cellNeighbour].classList.contains("static-block")) {
  obstructedCells++;
        }
```

Then when moving left or right, if there are no obstructed cells and the block isn’t at the edge of the grid, we allow the movement:
``` js
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
```
However after testing this I quickly realised that as several blocks’ rotations contain empty columns in their matrix on the left and/or right, some cells in the block matrix would have to move off the edge of the grid before the active cells reach the bounds. This means that empty cells would move to the opposite side of the grid but one row up, and this immediately becomes a problem if the player rotates the block into a state where some of the previously-empty cells are now occupied, as the block appears split across both sides of the grid. Also, if the player moves the block all the way to the top-left or bottom-right of the grid, we get an error as matrix cells move to undefined indices outside the `gridCells` array. I could also see this being an issue when the blocks reached the bottom or top of the grid: a block matrix like the “I” block that has an empty top row would need to begin with its `currentOrigin` outside of the grid; and any matrix with a blank bottom row would need those cells to exit the grid entirely before the block would appear to have reached the bottom, again throwing errors as we try to loop over undefined indices.


To fix this I decided the simplest option was to expand the grid beyond the playable area, adding two invisible rows/columns to all sides of the grid,and giving them an `out-of-bounds` class. Now the matrix can move beyond the edge of the playable grid without causing errors or visual glitches, whilst keeping the rendered cells within the playable area and constrained by the bounds (shown here minus the top `out-of-bounds` rows):
￼

![bounds cells 2](assets/images/readme/project-1-out-of-bounds-2.png 'Bounds cells 2')


Finally I styled the `out-of-bounds` cells with 0 width / height, so only the playable grid is seen by the player:


![bounds cells 3](assets/images/readme/project-1-out-of-bounds-3.png 'Bounds cells 3')


### Basic Rotation

As I had hard-coded the blocks’ 4 rotation-states, basic rotation was a matter of looking up the matrix for a given block and given rotation in my `allBlocks` object, then re-rendering the block with this new matrix. I wrote a `setBlockMatrix()` function to perform the lookup:

``` js
function setBlockMatrix() {
    currentBlockMatrix =
      allBlocks[`block${currentBlock}`][`rot${currentblockrotation}`];
  }
```

I added an eventListener to listen for ‘keydown’ and call a `rotateBlock()` function, and added a `currentBlockRotation` variable to keep track of the block’s orientation. `rotateBlock()` takes a keyCode as an argument, checks if the left or right rotation key has been pressed, and:
* calls `clearOldPosition()` to remove the currently rendered block;
* either changes `currentBlockRotation` by +/- 90, or if the result would be less than 0 or greater than 360 it sets the `currentBlockRotation` to 270 or 0 respectively;
* calls the `setBlockMatrix()` function to look up the matrix for the new `currentRotation`;
* calls `renderNewPosition()` to render a block with the new `currentBlockRotation` value:

``` jsx
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
```
### Clearing Rows

My `clearRows()` function uses a for loop to slice the grid into rows, excluding any cells that are outside the playable area (this is one place that having nested arrays for each row would simplify things), and checks each row to see if all cells contain the static-block class using `Array.every()`. If every cell is filled then we use a `forEach` to call the `clearCell()` function on each cell, before getting all remaining static blocks above the cleared row (by checking if their index is < the index of the cleared row), and using another `forEach` to clear the `static-block` class of each cell and then add it to the cell immediately below. `clearRows()` fires with the `fallTimer` interval, so it checks for new rows every time the block moves down.

``` js
function clearRows() {
for (
      let index = parseInt(
        gridCells[gridCells.length - gridRowCellCount * 3 + 2].dataset.index
      ); // index starts at the lowest lefthand corner of the playable grid
      index >= outOfBoundsRowCellCount;
      index -= gridRowCellCount // go up by one row each iteration
    ) {
      const rowToCheck = gridCells.slice(index, index + 10);
      if (rowToCheck.every((cell) => cell.classList.contains("static-block"))) {
        rowToCheck.forEach((cell) => clearCell(cell));

getCellsToMoveDown(index).forEach((cell) => {
          const cellClasses = Array.from(cell.classList);
          clearCell(cell);
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
```
### Game Over

To allow the game to end when the stack reaches the top of the grid, I wrote a `checkForGameOver()` function that returns true if the `currentOrigin` is within a certain distance of the top of the grid, and a `gameOver()` function which clears the `fallTimer` interval and displays a Game Over screen.

### Giving Blocks Different Colours

At this point all blocks were the same colour - not great to look at. I created a different CSS class for each block type, and named each so that I could access it using the `currentBlock` variable: `.block-${currentBlock}`.

Then I needed to make a couple of changes:
* When clearing rows I now needed to clear all block classes before shifting the stack down;  
* I was currently clearing the classes then adding `static-block` class to the squares below; now for blocks to retain their colour in the stack I needed to get the `classList` of each square and store it in a variable, before calling `element.classList.remove()`, so the correct block class could be added to the block below:
``` js
function clearRows() {
  for (
    let index = parseInt(
      gridCells[gridCells.length - gridRowCellCount * 3 + 2].dataset.index
    ); // index starts at bottom left corner of playable grid
    index >= outOfBoundsRowCellCount; // stop before top of playable grid
    index -= gridRowCellCount // go up by one row each iteration
  ) {
    const rowToCheck = gridCells.slice(index, index + 10);
    if (rowToCheck.every((cell) => cell.classList.contains("static-block"))) {
      rowToCheck.forEach((cell) => clearCell(cell));
      getCellsToMoveDown(index).forEach((cell) => {
        const cellClasses = Array.from(cell.classList);
        clearCell(cell);
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
```
### Advanced Rotation: adding Wall Kicks

From [Tetris.fandom.com](http://Tetris.fandom.com):
> A wall kick happens when a player rotates a piece when no space exists in the squares where that tetromino would normally occupy after the rotation. To compensate, the game sets a certain number of alternative spaces for the tetromino to look. Wall kicks started appearing in games because after a piece would be backed up against the wall, it would awkwardly be unable to rotate until first moving back.

There are various wall kick systems in Tetris games, and luckily plenty of good documentation from fans. After my some research I decided on the Standard Rotation System (SRS), which seemed to provide smarter functionality and offer more of a fun challenge to implement than some of the simpler mechanics.

This was probably the toughest part of the project to figure out. For the SRS, each block needs to attempt 4 x-axis and/or y-axis translations if basic rotation fails, to see if it can be placed somewhere nearby. The tests are different for:
* each rotation-state;
* whether the block is being rotated left or right;
* the I-block vs all other blocks.

This means that there are 80 tests to implement in total! Luckily working from the SRS meant I didn’t have to come up with my own system for how each block should behave - only to figure out the logic for the existing mechanic.

To tackle this, I grabbed SRS test data from [tetris.fandom.com/wiki/SRS](https://tetris.fandom.com/wiki/SRS), transposing the wiki's rotation notation to degrees and direction for clarity’s sake:


![Wall kick data](/assets/images/readme/project-1-wall-kick-data.png)

Having this as a checklist was useful for keeping track of which tests I had already implemented – after writing the first 40 or so they started to blur together…

My first step for implementing the SRS was to write a `tryRotate()` function which spawns an invisible test block with the CSS class `block-rotate-tes`t at a position controlled by a `testOrigin` variable. I then used `document.querySelectorAll` to return an array of any cells in the grid that have the `block-rotate-test` class plus either `out-of-bounds` or `static-block`. If the `array.length === 0` in both cases, the function will set the `currentOrigin` for the active block equal to the `testOrigin`, call `rotateBlock()` to perform the rotation, and return true. Otherwise the function will not return true and no rotation is performed.

```js 
function tryRotate() {
  renderNewPosition("block-rotate-test", testOrigin, testBlockMatrix);
  outOfBoundsCells = document.querySelectorAll(
    ".block-rotate-test.out-of-bounds"
  );
  occupiedCells = document.querySelectorAll(".block-rotate-test.static-block");
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
```

The second step was combining this function with the translation tests. To run each test I used an if statement to check if the block is being rotated left or right, then switch statements with a case for each rotation-state, which updates the `testOrigin` variable accordingly and calls `tryRotate()`. If `tryRotate() === true`, a rotation has been successfully performed and we return out of the switch statement. Otherwise we progress to the next test, updating `testOrigin` to a new test position, calling `tryRotate()` again with the new value, and so on. Finally if all five tests fail, we break from the switch and no rotation is performed. The below code block shows the tests for rotating most block types anticlockwise from 0 degrees:

```js
if (event.keyCode === rotateLeftKey) {
        switch (currentBlockRotation) {
          case 0:
            testOrigin = currentOrigin;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1 - gridRowCellCount;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + gridRowCellCount _ 2;
            if (tryRotate() === true) {
              return;
            }
            testOrigin = currentOrigin + 1 + gridRowCellCount _ 2;
            if (tryRotate() === true) {
              return;
            }
            break;
```

Getting this to work and seeing the game “think” its way around obstructed rotations was easily one of the most satisfying parts of the build. 

At this point all the main features were added, and the game played like Tetris!

<br>

### Styling & Bonus Functionality

I used the last day or so of my time on the project to add several finishing touches, improvements, and bonus features:
* Styling: I did this quite quickly, as I felt more comfortable about reworking the CSS later to add polish than delivering a game with half-finished functionality. I went with pastel colours and rounded borders on containers and the blocks, to push everything away from the blocky look I’d been staring at for most of the process, and imported the Sono font to match the rounded style.
* I added a start game button, and a “game over/play again?” screen. I used a div with absolute positioning and a translucent background-color to create a banner, and then toggled its CSS display property in each function that handled starting or ending the game.
* Levelling up and speeding up the blocks with each level. I did this by incrementing the currentPlayer.level and increasing the blockFallSpeed (which controls the fallTimer interval) when the player has cleared a given number of rows.
* A 3-second countdown before the game starts, to give the player time to get their hands on the keyboard - this is just a setInterval that
* A "next-up block view", telling the player which block was coming next. To implement this, I simply switched the logic for serving blocks to a nextBlock variable rather than the currentBlock, and then assigned current block to the “previous” next block before choosing a “new” nextBlock. Now the game serves a block whilst the player is still positioning the previous one, renders it to the next-up block viewer, and then only renders it to the screen once the previous one has been placed. I chose to render the viewer programmatically rather than just showing a static image of the next block, so that any styling changed wouldn’t mean having to update all the images of the blocks. Next for this feature, I would like to figure out a way to keep each block centred in the viewer.

<br>

---

## Challenges

* Keeping my code concise, clean and readable was one of the biggest challenges; partly down to hard-coding the blocks as one long object, and the lengthy logic for performing the wall-kick tests. Although I could have saved lines by coding each block as a flat array, I opted to retain the nested matrix structure, as it makes the blocks more readable on the page.
* Adding the wall kick tests, which took me a while to figure out how to extend the functionality for rendering blocks and basic rotation. Deciding to use an invisible “test block” initially helped me keep the logic for the wall kick tests and the active block separate in my mind.

<br>

---

## Wins

* Getting the wall kick tests working was incredibly satisfying. It felt like I’d given the game a (very basic) brain, and was great to be able to take the data and description of the functionality from actual Tetris games and figure out a way to implement it in my own code.
* The "next-up block viewer": this small bit of functionality adds more strategy to the game, and I enjoyed repurposing the grid and block matrix to render the block as part of the UI, as well as refactoring the code to select each block one block in advance of it being served to the player.

<br>

---

## Key Takeaways

* Importance of planning, wire framing, pseudocoding. Having a framework of notes and a to-do list helped me to know what the next step would be, and to keep sight of the big picture, avoiding tunnel vision on a single feature. I learned that thinking problems through and resisting the urge to just dive in and start coding makes for cleaner code and  pays back dividends in time later in a project.
* Importance of clear names for variables; avoid unclear ‘magic numbers’. Initially I hard-coded operands when incrementing/decrementing indices to move between rows & columns, and quickly lost track of what certain calculations were doing when I went back to them to change something. Lesson learned - I made sure to rewrite this code to use clearly named constants instead.
* Can initially be better to finish a feature than to be perfectionist about it. My goal was to build as complete a game as possible, and this taught me that finding a working solution before getting hung up on finding an elegant one makes it easier to stay on task… as long as I go back in and refactor once the feature is working, as rushing to implement all features without refactoring along the way makes for messy code.

<br>

---

## Bugs

    	When the player uses the arrow key to move the block down, there is a varying amount of lag before the block is added to the stack and/or a row is cleared. This is because addToStack() and clearRows() are only firing with the fallTimer interval; if the player uses the down-arrow to drop the block, this may be out of sync with the fallTimer, meaning there is a delay until the functions fire. This could be fixed by refactoring the code so the functions fire whenever the player moves the block.
    	The “Play” button will sometimes animate but not start the game when clicked. This can be avoided by clicking near the centre of the button or clicking very quickly, so it seems that because the animation is achieved by reducing the button’s scale, if the mouse is too far from the centre of the button then it will shrink so the mouse is no longer over the button and therefore no “click” event is registered by the eventListener. This could be fixed by changing the animation, listening for a different event, or having separate elements for the animation and the eventListener so the clickable area does not shrink.

<br>

---

## Future Improvements

Although I’m satisfied that I implemented nearly all my desired functionality, there are several things on my to-do list for when I next grab a moment to work on this project:
* Refactor my code to keep it DRY. There is more repetition than I’d like, where I opted to write new functions to keep similar features separate to make it easier to hold everything in my head. In most cases I could slightly rearrange the logic and pass different values to one function to achieve the same results with fewer lines.
* Break longer blocks of code out into modules, to keep everything concise and readable (especially the allBlocks object and the wall kick tests).
* Add the classic “hard-drop” functionality, letting the player instantly drop the block to the stack below.
Responsive design: this was a stretch goal in the original brief, so it would be good to add it. I’d also like to add touchscreen controls for mobile.
* Add audio - I considered this one of the less important features of the game, but it would spice the game up a lot.
* Pausing the game! At the moment, once you start, you can’t stop until you lose (I’m sure there’s a bleak metaphor in there somewhere). I should be able to implement cancelling and restarting the block fall timer to achieve this.
* A “level clear” screen – giving the player a moment to pause before continuing to the next level.
* Leaderboard using localStorage - again a stretch goal from the original brief; would be good to add for this reason.

