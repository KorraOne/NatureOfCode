let softBody;
let gravity;

function setup() {
  createCanvas(600, 600);

  softBody = new SoftBody(200, 200, 100, 100, 0.01);
  gravity = 3;
}

function draw() {
  colorMode(RGB);
  background(220);

  controls();

  softBody.update();
  softBody.edges();
  softBody.show();
}

// function keyPressed() {
//   if (key == "a") {
//     softBody.applyForce(createVector(-5, 0));
//   }
//   if (key == "d") {
//     softBody.applyForce(createVector(5, 0));
//   }
//   if (key == "w") {
//     softBody.applyForce(createVector(0, -5));
//   }
//   if (key == "s") {
//     softBody.applyForce(createVector(0, 5));
//   }

//   if (key == " ") {
//     softBody.expand();
//   }
// }

function controls() {
  if (keyIsDown(65)) { // 65 is the keyCode for 'A'
    softBody.applyForce(createVector(-5, 0));
  }
  if (keyIsDown(68)) { // 68 is the keyCode for 'D'
    softBody.applyForce(createVector(5, 0));
  }
  if (keyIsDown(87)) { // 87 is the keyCode for 'W'
    softBody.applyForce(createVector(0, -5));
  }
  if (keyIsDown(83)) { // 83 is the keyCode for 'S'
    softBody.applyForce(createVector(0, 5));
  }

  if (keyIsDown(32)) { // 32 is the keyCode for spacebar
    softBody.expand();
  }
}