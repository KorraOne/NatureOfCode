let balloon;
let xoff = 0;
let yoff = 1000;

function setup() {
  createCanvas(600, 600);

  balloon = new Balloon(width / 2, height / 2);
}

function draw() {
  background(220);

  balloon.applyForce(createVector(0, -0.1));
  wind();
  balloon.update();
  balloon.edges();
  balloon.show();
}

function keyPressed() {
  balloon.applyForce(createVector(0, 5));
}

class Balloon{
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(1, 1);
    this.acceleration = createVector(0, 0);

    this.mass = 30;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.mult(0.99);
    this.velocity.limit(10);
    this.position.add(this.velocity);

    this.acceleration.mult(0);
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(255, 0, 0);
    ellipse(this.position.x, this.position.y, this.mass, this.mass);
  }

  edges() {
    if (this.position.y > height - this.mass/2) {
      this.position.y = height - this.mass/2;
      this.velocity.y *= -1;
    } else if (this.position.y < this.mass/2) {
      this.position.y = this.mass/2;
      this.velocity.y *= -1;
    }
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
  }
}

function wind() {
  let windX = noise(xoff) * 0.1;
  if (windX < 0.05) {
    windX = 0;
  }
  let windY = noise(yoff) * 0.1;
  print(windY);
  if (windY < 0.05) {
    windY = 0;
  }

  let wind = createVector(windX, windY);
  xoff += 0.01;
  yoff += 0.01;

  balloon.applyForce(wind);
}