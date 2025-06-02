let cells = [];
let cellsHistory = [];
let w = 10;
let ruleNumber = 33;
let ruleSet = [];

function setup() {
  createCanvas(1000, 600);
  resetSimulation();
}

function draw() {
  background(127);
  
  for (let i = 0; i < cellsHistory.length; i++) {
    for (let j = 0; j < cells.length; j++) {
      noStroke();
      fill(255 - cellsHistory[i][j] * 255);
      rect(j * w, i * w, w, w);
      
    }
  }

  let nextCells = [];
  for (let i = 0; i < cells.length; i++) {
    let left = cells[(i - 1 + cells.length) % cells.length];
    let mid = cells[i];
    let right = cells[(i + 1) % cells.length];

    let newState = calculateNextGen(left, mid, right);
    nextCells.push(newState);
  }

  cellsHistory.push([...nextCells]);

  if (cellsHistory.length > floor(height / w)) {
    cellsHistory.shift();
  }

  cells = nextCells;

  frameRate(10);
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    ruleNumber = min(255, ruleNumber + 1);
  } else if (keyCode === LEFT_ARROW) {
    ruleNumber = max(0, ruleNumber - 1);
  }
  console.log(ruleNumber);
  resetSimulation();
}

function resetSimulation() {
  background(127);
  ruleSet = decimalToRuleSet(ruleNumber);

  cells = new Array(floor(width / w)).fill(0);
  cells[floor(cells.length / 2)] = 1;

  cellsHistory = [ [...cells] ];
}

function calculateNextGen(left, mid, right) {
  return ruleSet[left * 4 + mid * 2 + right * 1];
}

function decimalToRuleSet(decimal) {
  let binaryString = decimal.toString(2).padStart(8, "0");
  return binaryString.split("").map(Number).reverse();
}