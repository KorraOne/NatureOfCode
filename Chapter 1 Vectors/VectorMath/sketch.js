function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(225);
  
  let mouse = new Vect(mouseX - width / 2, mouseY - height / 2);


  translate(width / 2, height / 2);

  stroke(0);
  strokeWeight(2);
  line(0, 0, mouse.x, mouse.y);

  mouse.normalize();
  mouse.mult(100);
  stroke(0);
  strokeWeight(4);
  line(0, 0, mouse.x, mouse.y);
}