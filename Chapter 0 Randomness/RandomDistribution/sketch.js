let randomCount = [];
let total = 100;

function setup() {
  createCanvas(800, 400);
  for (let i = 0; i < total; i++) {
    randomCount[i] = 0;
  }
}

function draw() {
  background(220);
  text(round(frameRate(), 2), 10, 10)

  let index = floor(random(randomCount.length));
  randomCount[index]++;

  stroke(0);
  fill(128);
  let w = width / randomCount.length;

  for (let x = 0; x < randomCount.length; x++) {
    rect(x * w, height - randomCount[x], w - 1, randomCount[x]);
  }
}
