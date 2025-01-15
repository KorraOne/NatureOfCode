let cloud
let boxHeight;
let boxOn;

function setup() {
  createCanvas(600, 600);

  cloud = new Cloud(width / 2, height / 2);

  size = createSlider(5, 100, 100, 1);
  pop = createSlider(5, 300, 300, 1);
  box = createSlider(-100, 200, 90, 1);
  boxOn = createCheckbox('Box', true);
  newCloud = createButton('New Cloud');
}

function draw() {
  background(0, 255, 255);

  cloud.show();
  cloud.size = size.value();
  cloud.population = pop.value();
  boxHeight = box.value();
  newCloud.mousePressed(function() {
    cloud = new Cloud(width / 2, height / 2, pop.value());
  });
}

class Cloud {
  constructor(x, y, population) {
    this.x = x;
    this.y = y;
    this.size = 100;
    this.population = population || 200;

    this.puffs = [];
    let xCoords = [];
    for (let i = 0; i < this.population; i++) {
      xCoords.push(i - this.population / 2);
    }

    let t = random(10000);
    for (x of xCoords) {
      this.puffs.push(new Puff(this.x + x, this.y + noise(t) * 100));
      t += 0.05;
    }
  }

  show() {
    for (let puff of this.puffs) {
      fill(255);
      noStroke();
      circle(puff.x, puff.y, this.size);
    }

    if (boxOn.checked()) {
      fill(0, 255, 255);
    } else {
      fill(0, 20);
    }
    rectMode(CENTER);
    rect(this.x, this.y + boxHeight, this.population + this.size, 100);

    for (let puff of this.puffs) {
      // puff.show();
    }
  }
}

class Puff {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    fill(0);
    circle(this.x, this.y, 5);
  }
}