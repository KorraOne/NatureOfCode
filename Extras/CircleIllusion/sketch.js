let paths = [];
let amount = 40
let angleSpacing;
let length = 400;

function setup() {
  background(220);
  createCanvas(600, 600);

  
  angleSpacing = PI/amount;
  circleSpacing = length/amount;

  for (let i=0; i<amount; i++)
    paths.push(new Path(width/2, height/2, length, i * angleSpacing, i * circleSpacing));
}

function draw() {
  background(220);

  for (path of paths) {
    path.update();
    path.show();
  }
}

class Path {
  constructor(x, y, length, angle, circleStart) {
    this.position = createVector(x, y);
    this.length = length;
    this.angle = angle;
    
    this.circlePoint = circleStart;
    this.circlePointAccel = -1;
  }
  
  update() {
    this.angle += 0;
    
    if (this.circlePoint >= length || this.circlePoint <= 0) {
      this.circlePointAccel *= -1;
    }

    this.circlePoint += this.circlePointAccel;
  }

  show() {
    strokeWeight(2);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    line(0, -this.length/2, 0, this.length/2)

    translate(0, -200);
    circle(0, this.circlePoint, 10);
    pop();
  }
}