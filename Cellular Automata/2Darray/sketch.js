let cells = [];
let w = 4;
let y = 0;
let ruleNumber = 33;
let ruleSet = [];

function setup() {
  createCanvas(1000, 10000);
  resetSimulation();
}

function draw() {
  for (let i = 0; i < cells.length; i++) {
    noStroke();
    fill(255 - cells[i] * 255);
    rect(i * w, y, w, w);
  }

  let nextCells = [];
  for (let i = 0; i < cells.length; i++) {
    let left = cells[(i - 1 + cells.length) % cells.length];
    let mid = cells[i];
    let right = cells[(i + 1) % cells.length];

    let newState = calculateNextGen(left, mid, right);
    nextCells[i] = newState;
  }

  cells = nextCells;
  y += w;
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
  background(220);
  y = 0;
  ruleSet = decimalToRuleSet(ruleNumber);

  cells = new Array(floor(width / w)).fill(0);
  cells[floor(cells.length / 2)] = 1;
}

function calculateNextGen(left, mid, right) {
  return ruleSet[left * 4 + mid * 2 + right * 1];
}

function decimalToRuleSet(decimal) {
  let binaryString = decimal.toString(2).padStart(8, "0");
  return binaryString.split("").map(Number).reverse();
}