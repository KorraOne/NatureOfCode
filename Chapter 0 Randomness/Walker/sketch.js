let walker;

function setup() {
  createCanvas(800, 500);
  background(255);
  walker = new Walker();
}

function draw() {
  // background(220, 10);
  walker.show();
  walker.step();
}

class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }
  
  show() {
    stroke(0);
    point(this.x, this.y);
  }
  
  step() {
    // const r = random(1);
    // let xstep;
    // let ystep;
    //
    // if (r < 0.01) {
    //   xstep = random(-30, 30);
    //   ystep = random(-30, 30);
    // } else if (r < 0.1) {
    //   xstep = random(-10, 10);
    //   ystep = random(-10, 10);
    // } else {
    //   xstep = random(-3, 3);
    //   ystep = random(-3, 3);
    // }

    let xstep = randomNum2(-10, 10);
    let ystep = randomNum2(-10, 10);

    this.x += xstep;
    this.y += ystep;

    this.contain();
  }

  contain() {
    if (this.x > width) {
      this.x -= width;
    } else if (this.x < 0) {
      this.x += width;
    }
    if (this.y > height) {
      this.y -= height;
    } else if (this.y < 0) {
      this.y += height;
    }
  }
}

function randomNum1(min, max) {
  while (true) {
    let r1 = random(min, max);
    let r2 = random(min, max);

    if (r1 > r2) {
      if (random(1) > 0.5) {
        return -r2;
      } else {
        return r2;
      }
    }
  }
}

function randomNum2(min, max) {
  let r1 = random(min, max);
  let r2 = random(r1, max);
  r2 = random(min, r1);

  if (random(1) > 0.5) {
    return -r2;
  } else {
    return r2;
  }
}