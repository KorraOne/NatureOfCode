class Body {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

    this.mass = 1;

    this.debug = true; //for debug conditionals
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);

    // visualise force
    if (this.debug) {
      strokeWeight(3)
      stroke(0)
      f = force.copy();
      f.mult(5);
      line(this.position.x,
          this.position.y,
          this.position.x + f.x,
          this.position.y + f.y
      )
    }
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    // debug display forces
    if (this.debug) {
      // get velocity and scale for visualisation purposes only
      let lineVector = this.velocity.copy();
      lineVector.mult(5);

      // move to relative of body and return after drawn
      push();
      translate(this.position.x, this.position.y);
      
      strokeWeight(3);
      stroke(0);
      line(0, 0, lineVector.x, lineVector.y);
      pop();
    }
  }

  show() {
    fill(0, 120);
    circle(this.position.x, this.position.y, this.mass * 40);
  }
}