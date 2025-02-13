class Goober {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.position = createVector(x, y);
    this.maxSpeed = 10;

    this.currentTarget = createVector(600, 600);

    this.radius = 20;
    this.r, this.g, this.b = 93, 46, 240;

    // water values
    this.drink = new Drink(this, 100, 0.2);
  }

  applyForce(force) {
    // let newForce = p5.Vector.div(force, this.mass);
    this.acceleration.add(force);
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxSpeed);
    // desired.mult(0.01);

    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(1);
    this.applyForce(steer);
  }

  wander() {
    let distanceToTarget = p5.Vector.dist(this.position, this.currentTarget);

    if (distanceToTarget < 5 && !this.drink.thirsty) {
      // choose random location
      this.currentTarget = createVector(random(width), random(height));
    }

    this.seek(this.currentTarget);
  }
 
  show() {
    noStroke();
    fill(93, 46, 240);
    fill(this.r, this.g, this.b);
    circle(this.position.x, this.position.y, this.radius*2);
  }

  update(x, y) {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    this.acceleration.set(0, 0);
  }

  run() {
    this.drink.run();
    if (!this.drink.thirsty) {
      this.wander();
    }

    this.update(mouseX, mouseY);
    this.show();
  }
}