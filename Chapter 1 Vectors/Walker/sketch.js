function setup() {
  createCanvas(800, 600);
  background(255);

  pos = createVector(width / 2, height / 2);
  // vel = createVector(3, 3);
}

let tc = 0;
let td = 0;

function draw() {
  // background(255);

  let vel = p5.Vector.random2D();
  // let vel = createVector(10 - noise(td), noise(td + 10000));
  vel.mult(random(40));
  pos.add(vel);

  pos = contain(pos);

  noStroke()
  fill(map(noise(tc), 0, 1, 0, 255),
      map(noise(tc + 100), 0, 1, 0, 255),
      map(noise(tc + 1000), 0, 1, 0, 255));

  circle(pos.x, pos.y, 30);

  tc += 0.01;
  td += 1;
}

function contain(pos) {
  if (pos.x < 0) {
    pos.x += width;
  } else if (pos.x > width) {
    pos.x -= width;
  }

  if (pos.y < 0) {
    pos.y += height;
  } else if (pos.y > height) {
    pos.y -= height;
  }

  return pos
}