# JS Maze

This is a simple javascript (node) maze game.

### Installation

`npm install` to install required node modules


### How to play

At it's most basic, launch the game by executing `node maze.js`.  This will generate a 10x10 maze.

If you want to play a different size, just pass the desired width and height as parameters, ie: `node maze.js 4 8` will generate a 4x8 maze.

Game play is very straight-forward:

- Navigate with the arrow keys.
- Toggle between individual cell and full map views, press `m`.
- Toggle 'easy' mode (show full map, or only reveal visited cells), press `e`.
- To generate a new maze (before you finish the current maze), press `n`.
- To quit, press `ctrl-c`.

You will begin in the top-left corner of the maze, and must navigate to the bottom right to complete the maze.

**Note:** There will only ever be _one single path_ between start and finish.
