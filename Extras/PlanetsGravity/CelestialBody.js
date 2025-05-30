class Celestialbody {
  constructor(x, y, g, name) {
    this.name = name;
    this.g = g

    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

    this.gravity = createVector(0, convertGravity(g));
    this.r = 10;

    this.seconds = 0;
    this.frames = 0;
    this.falling = true;
  }
  
  info() {
    strokeWeight(0);
    textAlign(CENTER);
    textSize(32);
    text(this.name, width/2, height/2);
    textSize(24);
    text("Surface Gravity: " + str(this.g) + "m/s2", width/2, height/2+30);
    let metre = round(this.seconds*this.g, 2);
    text("Top Velocity = " + metre + "m/s (" + round(metre*3.6, 2) + "km/h)", width/2, height/2 + 60);

  }

  isHover(mousePos) {
    let vector = p5.Vector.sub(mousePos, this.position);
    return vector.mag() < this.r;
  }

  update() {
    if (this.falling) {
      this.acceleration.add(this.gravity);
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
    
      this.seconds = this.frames / secondScalar;
      this.frames++;
    }

    this.acceleration.set(0, 0);
  }

  edges() {
    if (this.position.y > height) {
      this.position.y = height - this.r;
      this.falling = false;
    }
  }

  show() {
    noStroke();
    if (this.isHover(mousePos)) {fill(255, 0, 0)} else {fill(0)};
    circle(this.position.x, this.position.y, this.r*2);

    textAlign(CENTER);
    textSize(12);
    text(round(this.seconds, 2), this.position.x, height - 40);
  }

  run() {
    if (this.isHover(mousePos)) {
      this.info();
    }
    this.update();
    this.edges();
    this.show();
  }
}

class Moon extends Celestialbody {
  constructor(x, y, g, name) {
    super(x, y, g, name);

    this.r = 5;
  }

  show() {
    noStroke();
    if (this.isHover(mousePos)) {fill(255, 0, 0)} else {fill(0)};
    circle(this.position.x, this.position.y, this.r*2);

    textAlign(CENTER);
    text(round(this.seconds, 2), this.position.x, height - 30);
  }
}