let walkers = [];

function setup() {
  createCanvas(2000, 2000);

  walkers.push(new Walker(width / 2, height / 2));
  walkers.push(new Walker(width, height));
  walkers.push(new Walker(100, 400));
}

function draw() {
  background(220);

  for (let walker of walkers) {
    walker.accelCalc(walkers);
    walker.update();
    walker.checkEdges();
    walker.show();
  }
}

class Walker {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.vel.limit(10);
    this.accel = createVector(0, 0);
  }

  accelCalc(arr) {
    for (let walker of arr) {
      if (walker !== this) {
        let force = p5.Vector.sub(walker.pos, this.pos);
        this.accel.add(force);
      }
    }
  }

  update() {
    this.vel.add(this.accel);
    this.vel.limit(10);
    this.pos.add(this.vel);

    stroke(255, 0, 0, 100);
    line(this.pos.x, this.pos.y, this.pos.x + this.accel.x * 10, this.pos.y + this.accel.y * 10);
    
    // reset accel
    // this.accel.mult(0);
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(127);
    circle(this.pos.x, this.pos.y, 20);

    stroke(0, 100);
    line(this.pos.x, this.pos.y, this.pos.x + this.vel.x * 10, this.pos.y + this.vel.y * 10);
  }

  checkEdges() {
    if (this.pos.x < 0) {
      this.pos.x += width;
    } else if (this.pos.x > width) {
      this.pos.x -= width;
    }
  
    if (this.pos.y < 0) {
      this.pos.y += height;
    } else if (this.pos.y > height) {
      this.pos.y -= height;
    }
  }
}