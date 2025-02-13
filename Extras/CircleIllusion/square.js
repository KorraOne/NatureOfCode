let size = 10;
let angle = 0;
let amount = 13;
let squares = []

function setup() {
  createCanvas(600, 600);
  background(255);
  rectMode(CENTER);
  angleMode(DEGREES);
  noFill();
  
  
  translate(width/2, height/2);
  
  for (let i=0; i<amount; i++) {
    push();
    rotate(angle);
    squares.push(new Square(size, angle));
    pop();

    size *= 1.4;
    angle += 30
  }
}

function draw() {
  // background(255);
  if (frameCount % 200 == 100) {
    stroke(255);
  } else if (frameCount % 200 == 0) {
    stroke(0);
  }

  translate(width/2, height/2);

  for (let square of squares) {
    square.update();
    square.show();
  }
}

class Square {
  constructor(size, angle) {
    this.size = size;
    this.angle = angle;
  }

  update() {
    this.angle += 1;
  }

  show() {
    push();
    rotate(this.angle);
    square(0, 0, this.size);
    pop();
  }
}