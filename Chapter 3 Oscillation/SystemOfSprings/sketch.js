let particle1, particle2;
let spring;
let k = 0.001;
let restLength = 200;

let gravity;

function setup() {
  createCanvas(600, 600);
  particle1 = new Particle(300, 50);
  particle2 = new Particle(300, 300);
  spring = new Spring(k, restLength, particle1, particle2)

  particle1.applyForce(createVector(10, 0));
  particle2.applyForce(createVector(0, 0));

  gravity = createVector(0, 0.1);
}

function draw() {
  background(220);

  particle1.applyForce(gravity);
  particle2.applyForce(gravity);

  particle1.edges();
  particle2.edges();

  particle1.update();
  particle2.update();
  spring.update();

  particle1.show();
  particle2.show();
  spring.show();
}
