let a, b;

function setup() {
  createCanvas(800, 600);

  a = createVector(50, 300);
  b = createVector(750, 300);
}

function draw() {
  background(220);
  drawKochLine(a, b);
}


function drawKochLine(a, b) {
  stroke(0);
  line(a.x, a.y, b.x, b.y);
}