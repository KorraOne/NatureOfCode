let angle;
let lengthRatio;
let sliderAngle;
let sliderLengthRatio;

const lengthCutOff = 10;

function setup() {
  createCanvas(1200, 600);
  sliderAngle = createSlider(0, PI, PI / 4, 0.01);
  sliderLengthRatio = createSlider(0, 0.8, 0.6, 0.01);
}

function draw() {
  background(0);
  angle = sliderAngle.value();
  lengthRatio = sliderLengthRatio.value();
  stroke(255);
  strokeWeight(2);
  translate(width * 0.5, height);
  branch(130);
}

function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > lengthCutOff) {
    push();
    rotate(angle);
    branch(len * lengthRatio);
    pop();
    push();
    rotate(0);
    branch(len * lengthRatio);
    pop();
    push();
    rotate(-angle);
    branch(len * lengthRatio);
    pop();
  } else if (len < lengthCutOff) {
    // stroke(0, 255, 0);
    // line(0, 0, 0, -len);
    noStroke();
    fill(0, 255, 0);
    circle(0, 0, len/2);
  }
}
