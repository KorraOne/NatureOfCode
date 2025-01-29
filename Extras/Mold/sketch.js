let molds = []; let amount = 5000;
let d;
var canvas;

function setup() {
  canvas = createCanvas(600, 600);
  background(0);
  
  for (i=0; i<amount; i++) {
    molds[i] = new Mold(random(width), random(height));
  }
  d = pixelDensity();
}

function draw() {
  frameRate();
  background(0, 10);

  if (mouseInCanvas()) {
    fill(255, 0, 0);
    circle(mouseX, mouseY, 20);
  }


  loadPixels();
  for (i=0; i<amount; i++) {
    molds[i].update();
    molds[i].show();
  }
}

function getIndex(col, row) {
  col = floor(col);
  row = floor(row);
  index = 4*(d*row) * (d*width) + 4*(d*col);
  return index;
}

function mouseInCanvas() {
  return mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height
}