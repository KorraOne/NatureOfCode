let box;

function setup() {
  createCanvas(windowWidth, windowHeight);
  box = new Box();
}

function draw() {
  background(220);

  // move away from mouse
  let force = createVector(mouseX, mouseY);
  force.sub(box.position);
  if (force.mag() < 100) {
    force.normalize();
    force.mult(-10);
    box.applyForce(force);
  } else {
    force = createVector(width/2, height/2);
    force.sub(box.position);
    force.normalize();
    force.clampToZero();
    box.applyForce(force);
  }

  box.edges();
  box.update();
  box.show();
}
