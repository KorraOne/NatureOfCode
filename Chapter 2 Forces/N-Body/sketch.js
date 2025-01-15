let body;

function setup() {
  createCanvas(600, 600);

  body = new Body(300, 50);
}

function draw() {
  background(220);

  body.applyForce(createVector(0, 0.1));
  body.update();
  body.show();
}
