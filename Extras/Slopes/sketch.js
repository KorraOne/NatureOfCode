let ball;
let slope;
let gravity;

function setup() {
  createCanvas(600, 600);

  gravity = createVector(0, 0.01);

  ball = new Ball(width/4, 350);
  slope = new Slope(0, height/2, width, height)
}

function draw() {
  background(220);

  // ball.position.set(mouseX, mouseY);
  ball.run();
  slope.show();
}

function keyPressed() {
  if (key == " ") {
    ball.applyForce(createVector(1, 0));
  }
}