
// conversion of real values to canvas
let metreScalar = 6300;    // 6300px for irl==
let secondScalar = 60;    // 60frames

let sunObject, mercuryObject, venusObject, earthObject, moonObject, 
    marsObject, jupiterObject, saturnObject, uranusObject, NeptuneObject,
    plutoObject;
let objects = [];


let dropHeight;
let ruler;
let mousePos;

function setup() {
  createCanvas(1000, 600);

  dropHeight = 1;
  ruler = new Ruler(height);
  mousePos = createVector(mouseX, mouseY);

  objects.push(new Celestialbody(100, height - MetreToPixel(dropHeight), 274.00, "The Sun"));
  objects.push(new Celestialbody(200, height - MetreToPixel(dropHeight), 3.7, "Mercury"));
  objects.push(new Celestialbody(300, height - MetreToPixel(dropHeight), 8.87, "Venus"));
  objects.push(new Celestialbody(400, height - MetreToPixel(dropHeight), 9.81, "Earth"));
  objects.push(new Moon(420, height - MetreToPixel(dropHeight), 1.62, "The Moon"));
  objects.push(new Celestialbody(500, height - MetreToPixel(dropHeight), 3.71, "Mars"));
  objects.push(new Celestialbody(600, height - MetreToPixel(dropHeight), 24.79, "Jupiter"));
  objects.push(new Celestialbody(700, height - MetreToPixel(dropHeight), 10.44, "Saturn"));
  objects.push(new Celestialbody(800, height - MetreToPixel(dropHeight), 8.69, "Uranus"));
  objects.push(new Celestialbody(900, height - MetreToPixel(dropHeight), 11.15, "Neptune"));
  objects.push(new Moon(950, height - MetreToPixel(dropHeight), 0.62, "Pluto"));
}

function draw() {
  background(220);
  frameRate(60);
  displayFrameRate();

  mousePos.set(mouseX, mouseY);
  ruler.show();

  for (let object of objects) {
    object.run();
  }
}

function mousePressed() {
  for (let object of objects) {
    object.velocity.set(0, 0);
    object.position.y = mouseY;
    object.seconds = 0;
    object.frames = 0;
    object.falling = true;
  }
}

// converts g = Xm/s2 into g = Xpx/f2, given X/constant
function convertGravity(constant) {
  return (constant*metreScalar)/(secondScalar*secondScalar)
}

function MetreToPixel(metre) {
  return metre*metreScalar;
}

function PixelToMetre(pixel) {
  return pixel/metreScalar;
}

function displayFrameRate() {
  textAlign(RIGHT);
  textSize(12);
  fill(0);
  text("1 second = " + round(frameRate()) + " frames", width-3, 20);
  text("1 metre = " + round(metreScalar, 0) + " pixels", width-3, 40);
}

function keyPressed() {
  if (key == " ") {
    metreScalar = random(2, 1000);
    ruler.spacing = this.height / (PixelToMetre(this.height));

    for (let object of objects) {
      object.gravity = createVector(0, convertGravity(object.g));
    }
  }
}