class Drink {
  constructor(parent, max, threshold) {
    this.parent = parent;

    this.thirsty = false;
    this.max = max;             // 100
    this.threshold = threshold; // 0-1 (~%)
    this.level = this.max;


    // values to change water level
    this.increment = 10;
    this.decrement = -1;
  }

  /**
   * Compares water level to threshold and sets true if below
  */
  _updateStatus() {
    // setting status based on water.level
    this.thirsty = (this.level < this.threshold * this.max) ? true : false;
  }


  _increment() {
    this.level += this.increment / deltaTime;
  }

  _decrement() {
    this.level += this.decrement / (deltaTime);
  }

  
  /**
   * Move towards closest lake
  */
  _move() {
    let closestLake;
    let closestDist;
    for (let lake of lakes) {
      let dist = p5.Vector.sub(lake.position, this.parent.position).mag();
      
      if (dist < closestDist || closestLake == null) {
        closestDist = dist;
        closestLake = lake;
      }
    }
    
    this.parent.seek(closestLake.position);
  }

  run() {
    this._updateStatus();

    // check if near lake, update water level
    for (let lake of lakes) {
      lake.canDrink(this.parent) ? this._increment() : this._decrement();
    }
    // min 0, max this.max (100)
    this.level = constrain(this.level, 0, this.max);


    if (this.thirsty) {
      this.parent.r, this.parent.g, this.parent.b = 255, 0, 0;
      this._move();
    }
  }
}