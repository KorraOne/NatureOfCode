class lake {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.radius = 30;
  }

  canDrink(drinker) {
    let tolerance = 5;
    let dist = p5.Vector.sub(drinker.position, this.position).mag();

    return (dist < this.radius + drinker.radius + tolerance)
  }

  show() {
    noStroke();
    fill(0, 141, 213);
    circle(this.position.x, this.position.y, this.radius*2);
  }
}