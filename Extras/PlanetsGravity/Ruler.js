class Ruler{
  static width = 20;

  constructor(height) {
    this.height = height;
    this.spacing = this.height / (PixelToMetre(this.height));
  }

  show() {
    noStroke();
    fill(0, 30);
    rect(0, 0, Ruler.width, this.height);

    fill(0);
    strokeWeight(2);
    stroke(0);

    textSize(16);
    textAlign(RIGHT);
    strokeWeight(1);

    let count = 0;
    for (let i=this.height-this.spacing; i>-this.spacing; i-=this.spacing) {
      count += 1
      line(0, i, Ruler.width, i);
      text(count, Ruler.width, i - 5);
    }
  }
}
