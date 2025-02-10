class Particle {
  constructor(x, y) {
    this.position = createVector(x, y)
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

    this.radius = 10;
    this.mass = 1;
    this.hue = 50;
  }

  // bug - is calculated based on the particles velocity and direction which creates weird scenarios if the particle is on a weird vector
  // fix - calculate based on corresponding frameParticles position (which is static) from centre of mass
  expand(middle, relativePos) {
    let force = p5.Vector.sub(relativePos, middle);
    force.normalize();
    force.mult(5);
    this.applyForce(force);
  }

  applyGravity() {
    this.acceleration.add(createVector(0, gravity));
  }

  applyForce(force) {
    let f = force.copy();
    f.div(this.mass)
    this.acceleration.add(f);
  }

  edges() {
    let bounce = 0;

    if (this.position.x < 0 + this.radius) {
      this.velocity.x *= -bounce;
      this.position.x = 0 + this.radius;
    } else if (this.position.x > width - this.radius) {
      this.velocity.x *= -bounce;
      this.position.x = width - this.radius;
    }

    if (this.position.y < 0 + this.radius) {
      this.velocity.y *= -bounce;
      this.position.y = 0 + this.radius;
    } else if (this.position.y > height - this.radius) {
      this.velocity.y *= -bounce;
      this.position.y = height - this.radius;
    }
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    this.velocity.mult(0.95);
    this.acceleration.mult(0);
  }

  show() {
    colorMode(HSB, 100);
    noStroke();
    fill(this.hue, 80, 80);
    circle(this.position.x, this.position.y, this.radius*2);
  }
}

class FrameParticle extends Particle {
  constructor(x, y, parent) {
    super(x, y);

    this.parentBody = parent;

    this.relativePos = p5.Vector.sub(parent.averagePosition(), this.position);
  }

  move() {
    this.position = p5.Vector.add(this.parentBody.averagePosition(), this.relativePos);
  }
}