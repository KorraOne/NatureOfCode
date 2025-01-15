function setup() {
  createCanvas(1000, 1000);

  sliderLength = createSlider(0, 500, 100, 1);
  sliderRatio = createSlider(0, 0.8, 0.4, 0.05);
}

function draw() {
  background(0);

  let lineLen = sliderLength.value();
  let lengthRatio = sliderRatio.value();
  
  stroke(255);
  strokeWeight(2);
  translate(width/2, height/2);
  
  flake(lineLen, 0 * PI/3, lengthRatio);
  flake(lineLen, 1 * PI/3, lengthRatio);
  flake(lineLen, 2 * PI/3, lengthRatio);
  flake(lineLen, 3 * PI/3, lengthRatio);
  flake(lineLen, 4 * PI/3, lengthRatio);
  flake(lineLen, 5 * PI/3, lengthRatio);
}

function flake(len, angle, ratio) {
  push();
  rotate(angle)
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 5) {
    //0
    push();
    rotate(0 * PI/3);
    flake(len * ratio, angle, ratio);
    pop();
    //60
    push();
    rotate(1 * PI/3);
    flake(len * ratio, angle, ratio);
    pop();
    //120
    push();
    rotate(2 * PI/3);
    flake(len * ratio, angle, ratio);
    pop();
    //180
    push();
    rotate(3 * PI/3);
    flake(len * ratio, angle, ratio);
    pop();
    //240
    push();
    rotate(4 * PI/3);
    flake(len * ratio, angle, ratio);
    pop();
    //300
    push();
    rotate(5 * PI/3);
    flake(len * ratio, angle, ratio);
    pop();
  }
  pop()
}
