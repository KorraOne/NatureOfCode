let rocket;
let gravity;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);

  gravity = createVector(0, 1);

  rocket = new Rocket(width/2, height, 0.99);
}

function draw() {
  background(255);

  rocket.applyGravity(gravity);
  rocket.run();
}