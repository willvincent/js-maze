# JS Maze

This is a simple javascript (node) maze game.

### Installation

`npm install` to install required node modules


### How to play

At it's most basic, launch the game by executing `node maze.js`.  This will generate a 10x10 maze.
If you want to play a different size, just pass the desired width and height as parameters, ie: `node maze.js 4 4` will generate a 4x8 maze.

Game play is straightforward.  Navigate with the arrow keys.  To view the full maze map, press `m`.  To generate a new maze, press `n`. Or `ctrl-c` to quit.

You will begin in the top-left corner of the maze, and must navigate to the bottom right to complete the maze. There is only ever _one single path_ between start and finish.
