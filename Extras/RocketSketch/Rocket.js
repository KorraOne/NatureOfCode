class Rocket {
  constructor(x, y, thrustToWeight) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

    this.angle = 0;
    this.angleVel = 0;
    this.angleAccel = 0;
  
    this.thrustToWeight = thrustToWeight;
    this.width = 20;
    this.height = 40;
  
    this.mass = 100;
    this.thrustPower = this.thrustToWeight * this.mass;
  }

  applyGravity(force) {
    this.acceleration.add(force);
  }

  _applyForce(force) {
    let newForce = p5.Vector.div(force, this.mass);
    this.acceleration.add(newForce);
  }

  _thrust() {
    // let thrust = p5.Vector.fromAngle(this.angle).mult(this.thrustPower);
    let thrust = createVector(0, -this.thrustPower);
    thrust.setHeading(this.angle - 90);
    this._applyForce(thrust);
    this._drawThrust()

    // removing fuel (mass)
    this.mass -= 0.01;
    print("mag = ", thrust.mag()/this.mass);
    print("y = ", thrust.y/this.mass);
  }

  _drawThrust() {
    push();
    // move to bottom of rocket
    translate(0, this.height/2);

    let flameLength = this.position.y / 10;
    triangle(-this.width/3, 0, this.width/3, 0, 0, flameLength);
    pop();
  }

  _update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    this.angleVel += this.angleAccel;
    this.angle += this.angleVel;

    this.velocity.mult(0.99);
    this.acceleration.set(0, 0);

    this.angleVel *= 0.99;
    this.angleAccel = 0;
  }

  _show() {
    noFill();
    rectMode(CENTER);
    rect(0, 0, this.width, this.height);
  }


  _edges() {
    if (this.position.y + this.height/2 > height) {
      this.position.y =  height - this.height/2;
      this.velocity.set(0, 0);
    }
  }

  run() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);

    this._update()
    this._edges();
    this._show();

    if (keyIsPressed) {
      if (key === " ") {
        this._thrust();
      }
      if (key === "a") {
        this.angle -= 45;
      }

      if (key === "d") {
        this.angle += 45;
      }
    }

    pop();
  }
}