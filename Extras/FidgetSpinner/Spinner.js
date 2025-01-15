class Spinner {
  constructor(x, y, arms, size) {
    this.position = createVector(x, y);
    this.size = map(size, 1, 4, 20, 60);
    this.arms = arms;
    this.angleBetween = 2*PI / this.arms;
    this.armLength = this.size;
    
    this.anglePosition = 0;
    this.AngleVelocity = 0.01;
    this.angleAcceleration = 0;

    this.dragging = false;
    this.dragOffset = createVector(0, 0);
  }

  addAngleForce(force) {
    this.angleAcceleration += force;
  }

  isTouching(touchX, touchY) {
    let touchPos = createVector(touchX, touchY);
    dist = p5.Vector.sub(touchPos, this.position);

    // half of diameter
    return (dist.mag() < (5/3*this.size + this.armLength) / 2)
  }

  startDragging(x, y) {
    this.dragging = true;
    this.dragOffset.set(this.position.x - x, this.position.y - y);
  }

  stopDragging() {
    this.dragging = false;
  }

  drag(x, y) {
    if (this.dragging) {
      this.position.set(x + this.dragOffset.x, y + this.dragOffset.y);
    }
  }

  update() {
    this.AngleVelocity += this.angleAcceleration;
    this.AngleVelocity *= 0.99
    this.anglePosition += this.AngleVelocity;

    this.angleAcceleration = 0;
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.anglePosition)

    strokeWeight(4);
    fill(0, 40);
    circle(0, 0, this.size);

    point(0, 0);

    for (let i = 0; i < 2 * PI; i += this.angleBetween) {
      rotate(this.angleBetween);
      circle(0, this.armLength, this.size * 2/3);

      line(-10, this.size/2, -this.size * 2/6, this.armLength);
      line(10, this.size/2, this.size * 2/6, this.armLength);   
    }

    pop();

    // hitbox
    if (debug) {
      rectMode(CENTER);
      fill(200, 0, 0, 60);
      noStroke();

      // inner circle = this.size
      // outer circle = 2/3 * this.size => 5/3*this.size
      // plus this.armlength
      circle(this.position.x, this.position.y, 5/3 * this.size + this.armLength)
    }
  }
}