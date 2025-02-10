class Ball {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  
    this.radius = 10;
    this.mass = 1;
  }

  applyForce(force) {
    let newForce = p5.Vector.div(force, this.mass);
    this.acceleration.add(newForce);
  }

  edges() {
    if (this.position.y > height - this.radius) {
      this.position.y = height - this.radius;
    }
  }

  update() {
    // gravity
    this.acceleration.add(gravity);

    if (slope.isContacting(this)) {
      slope.force(this);
    }

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    this.acceleration.set(0, 0);
  }

  show() {
    if (slope.isContacting(this)) {fill(255, 0, 0)} else {fill(0);}
    noStroke();
    circle(this.position.x, this.position.y, this.radius*2)
  }

  run() {
    this.update();
    this.edges();
    this.show();
  }
}