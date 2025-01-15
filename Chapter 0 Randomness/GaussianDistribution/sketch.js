function setup() {
  createCanvas(640, 400);
  background(220)
}

function draw() {
  // background(220);

  x = randomGaussian(width/2, width/4);
  y = randomGaussian(height/2, height/4);
  size = randomGaussian(30, 8);
  transperancy = randomGaussian(20, 8);

  noStroke();
  fill(0, transperancy);
  circle(x, y, size)
}