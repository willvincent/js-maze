var keypress = require('keypress')
 ,  console  = require('better-console');

keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

function newMaze(x, y) {

    // Establish variables and starting grid
    var totalCells = x*y;
    var cells = new Array();
    var unvis = new Array();
    for (var i = 0; i < y; i++) {
        cells[i] = new Array();
        unvis[i] = new Array();
        for (var j = 0; j < x; j++) {
            cells[i][j] = [0,0,0,0];
            unvis[i][j] = true;
        }
    }
    
    // Set a random position to start from
    var currentCell = [Math.floor(Math.random()*y), Math.floor(Math.random()*x)];
    var path = [currentCell];
    unvis[currentCell[0]][currentCell[1]] = false;
    var visited = 1;
    
    // Loop through all available cell positions
    while (visited < totalCells) {
        // Determine neighboring cells
        var pot = [[currentCell[0]-1, currentCell[1], 0, 2],
                [currentCell[0], currentCell[1]+1, 1, 3],
                [currentCell[0]+1, currentCell[1], 2, 0],
                [currentCell[0], currentCell[1]-1, 3, 1]];
        var neighbors = new Array();
        
        // Determine if each neighboring cell is in game grid, and whether it has already been checked
        for (var l = 0; l < 4; l++) {
            if (pot[l][0] > -1 && pot[l][0] < y && pot[l][1] > -1 && pot[l][1] < x && unvis[pot[l][0]][pot[l][1]]) { neighbors.push(pot[l]); }
        }
        
        // If at least one active neighboring cell has been found
        if (neighbors.length) {
            // Choose one of the neighbors at random
            next = neighbors[Math.floor(Math.random()*neighbors.length)];
            
            // Remove the wall between the current cell and the chosen neighboring cell
            cells[currentCell[0]][currentCell[1]][next[2]] = 1;
            cells[next[0]][next[1]][next[3]] = 1;
            
            // Mark the neighbor as visited, and set it as the current cell
            unvis[next[0]][next[1]] = false;
            visited++;
            currentCell = [next[0], next[1]];
            path.push(currentCell);
        }
        // Otherwise go back up a step and keep going
        else {
            currentCell = path.pop();
        }
    }
    return cells;
}

function initVisited (height, width) {
  var visited = [];

  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      if (typeof visited[x] === 'undefined') {
        visited[x] = [];
      }
      visited[x][y] = 0;
    }
  }

  visited[0][0] = 1;

  return visited;
}

function drawMap() {
  var lines = [];
  var line;
  var line_bottom;
  var cell;

  for (var y = 0; y < height; y++) {
    // prepend top
    if (y == 0) {
      line = '+';
      for (var x = 0; x < width; x++) {
        line += '---+';
      }
      lines.push(line);
    }

    line = '|';
    line_bottom = '+';

    for (var x = 0; x < width; x++) {
      cell = maze[y][x];
      console.log(cell);
      if (currentPosition[1] == x && currentPosition[0] == y) {
        line += ' @ ';
      }
      else {
        line += '   ';
      }
      if (cell[1] && ((visited[x][y] || visited[x+1][y]) || easy)) {
        line += ' ';
      }
      else {
        line += '|';
      }

      if (cell[2] && ((visited[x][y] || visited[x][y+1]) || easy)) {
        line_bottom += '   +';
      }
      else {
        line_bottom += '---+';
      }
    }
    lines.push(line);
    lines.push(line_bottom);
  }
  
  console.clear();
  lines.forEach(function (l) {
    console.log(l);
  });
  checkStatus();
}

function drawCell(cell) {
  console.clear();
  cell = cell.join(',');
  console.log('x: ' + (currentPosition[1] + 1) , 'y: ' + (currentPosition[0] + 1));
  switch (cell) {
    case '1,0,0,0':
      console.log('+--      --+');
      console.log('|          |');
      console.log('|          |');
      console.log('|          |');
      console.log('|          |');
      console.log('+----------+');
      break;
    case '0,1,0,0':
      console.log('+----------+');
      console.log('|          |');
      console.log('|');
      console.log('|');
      console.log('|          |');
      console.log('+----------+');
      break;
    case '0,0,1,0':
      console.log('+----------+');
      console.log('|          |');
      console.log('|          |');
      console.log('|          |');
      console.log('|          |');
      console.log('+--      --+');
      break;
    case '0,0,0,1':
      console.log('+----------+');
      console.log('|          |');
      console.log('           |');
      console.log('           |');
      console.log('|          |');
      console.log('+----------+');
      break;
    case '1,1,0,0':
      console.log('+--      --+');
      console.log('|          |');
      console.log('|');
      console.log('|');
      console.log('|          |');
      console.log('+----------+');
      break;
    case '1,0,1,0':
      console.log('+--      --+');
      console.log('|          |');
      console.log('|          |');
      console.log('|          |');
      console.log('|          |');
      console.log('+--      --+');
      break;
    case '1,0,0,1':
      console.log('+--      --+');
      console.log('|          |');
      console.log('           |');
      console.log('           |');
      console.log('|          |');
      console.log('+----------+');
      break;
    case '0,1,1,0':
      console.log('+----------+');
      console.log('|          |');
      console.log('|');
      console.log('|');
      console.log('|          |');
      console.log('+--      --+');
      break;
    case '0,0,1,1':
      console.log('+----------+');
      console.log('|          |');
      console.log('           |');
      console.log('           |');
      console.log('|          |');
      console.log('+--      --+');
      break;
    case '0,1,0,1':
      console.log('+----------+');
      console.log('|          |');
      console.log('');
      console.log('');
      console.log('|          |');
      console.log('+----------+');
      break;
    case '1,1,1,0':
      console.log('+--      --+');
      console.log('|          |');
      console.log('|');
      console.log('|');
      console.log('|          |');
      console.log('+--      --+');
      break;
    case '1,0,1,1':
      console.log('+--      --+');
      console.log('|          |');
      console.log('           |');
      console.log('           |');
      console.log('|          |');
      console.log('+--      --+');
      break;
    case '1,1,0,1':
      console.log('+--      --+');
      console.log('|          |');
      console.log('');
      console.log('');
      console.log('|          |');
      console.log('+----------+');
      break;
    case '0,1,1,1':
      console.log('+----------+');
      console.log('|          |');
      console.log('');
      console.log('');
      console.log('|          |');
      console.log('+--      --+');
      break;
    case '1,1,1,1':
      console.log('+--      --+');
      console.log('|          |');
      console.log('');
      console.log('');
      console.log('|          |');
      console.log('+--      --+');
      break;
  }

  checkStatus();
}

function checkStatus() {
  if (currentPosition[0] == (height - 1) && currentPosition[1] == (width - 1)) {
    console.warn('You win!');
    process.exit();
  }
}


var dimensions = process.argv.slice(2);
var height = dimensions[0] || 10;
var width = dimensions[1] || 10;
var easy  = dimensions[2] || false;
var currentPosition = [0, 0];
var viewingMap = false;
var visited = initVisited(width, height);

var maze = newMaze(width, height);
drawCell(maze[0][0]);

process.stdin.on('keypress', function (ch, key) {
  switch (key.name) {
    case 'm':
      if (!viewingMap) {
        drawMap();
      }
      else {
        drawCell(maze[currentPosition[0]][currentPosition[1]]);
      }
      viewingMap = !viewingMap;
      break;
    case 'e':
      easy = !easy;
      if (viewingMap) {
        drawMap();
      }
      break;
    case 'n':
      maze = newMaze(width, height);
      currentPosition = [0,0];
      visited = initVisited(width, height);
      if (viewingMap) {
        drawMap();
      }
      else {
        drawCell(maze[currentPosition[0]][currentPosition[1]]);
      }
      break;
    case 'up':
      if (maze[currentPosition[0]][currentPosition[1]][0]) {
        currentPosition[0]--;
        visited[currentPosition[1]][currentPosition[0]] = 1;
        if (viewingMap) {
          drawMap();
        }
        else {
          drawCell(maze[currentPosition[0]][currentPosition[1]]);
        }
      }
      break;
    case 'down':
      if (maze[currentPosition[0]][currentPosition[1]][2]) {
        currentPosition[0]++;
        visited[currentPosition[1]][currentPosition[0]] = 1;
        if (viewingMap) {
          drawMap();
        }
        else {
          drawCell(maze[currentPosition[0]][currentPosition[1]]);
        }
      }
      break;
    case 'left':
      if (maze[currentPosition[0]][currentPosition[1]][3]) {
        currentPosition[1]--;
        visited[currentPosition[1]][currentPosition[0]] = 1;
        if (viewingMap) {
          drawMap();
        }
        else {
          drawCell(maze[currentPosition[0]][currentPosition[1]]);
        }
      }
      break;
    case 'right':
      if (maze[currentPosition[0]][currentPosition[1]][1]) {
        currentPosition[1]++;
        visited[currentPosition[1]][currentPosition[0]] = 1;
        if (viewingMap) {
          drawMap();
        }
        else {
          drawCell(maze[currentPosition[0]][currentPosition[1]]);
        }
      }
      break;
  }
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  }
});