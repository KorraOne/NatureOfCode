let spinners = [];
let debug = false;

let touchStartTime;
const HOLD_THRESHOLD = 500;

let armBtn;

function setup() {
  createCanvas(393, 400);

  // spinners.push(new Spinner(100, 100, 2, 1));
  // spinners.push(new Spinner(200, 300, 4, 3));
  for (let i = 0; i < 1; i++) {
    let x = randomGaussian(width/2, 100);
    let y = randomGaussian(height/2, 100);
    let arms = floor(random(2, 10));
    let size = floor(random(4, 5));
    spinners.push(new Spinner(x, y, arms, size));
  }

  armBtn = createSlider(1, 9, 3, 1);
}

function draw() {
  background(220);

  for (spinner of spinners) {
    spinner.arms = armBtn.value();
    spinner.angleBetween = 2*PI / spinner.arms;
    spinner.update();
    spinner.show();
  }
}

function touchStarted() {
  touchStartTime = millis();
  for (let touch of touches) {
    for (let spinner of spinners) {
      if (spinner.isTouching(touch.x, touch.y)) {
        spinner.startDragging(touch.x, touch.y);
      }
    }
  }
}

function touchMoved() {
  for (let touch of touches) {
    for (let spinner of spinners) {
      spinner.drag(touch.x, touch.y);
    }
  }
}

function touchEnded() {
  let touchDuration = millis() - touchStartTime;
  for (let spinner of spinners) {
    if (spinner.dragging) {
      spinner.stopDragging();
    } else if (touchDuration < HOLD_THRESHOLD) {}
      spinner.addAngleForce(0.1);
  }
}