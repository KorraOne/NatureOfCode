class Slope {
  constructor(x1, y1, x2, y2) {
    this.startPos = createVector(x1, y1);
    this.endPos = createVector(x2, y2);
  }

  isContacting(object) {
    let lineVec = p5.Vector.sub(this.endPos, this.startPos);
    let pointVec = p5.Vector.sub(object.position, this.startPos);
    let projectedLength = pointVec.dot(lineVec) / lineVec.magSq();
    projectedLength = constrain(projectedLength, 0, 1);

    let closestPoint = p5.Vector.add(this.startPos, lineVec.mult(projectedLength));
    let distanceToLine = p5.Vector.dist(object.position, closestPoint);

    return distanceToLine <= object.radius;
  }

  force(object) {
    let force = createVector(0.2, -object.velocity.y);
    object.applyForce(force);
  }

  show() {
    stroke(0, 0, 0);
    line(this.startPos.x, this.startPos.y, this.endPos.x, this.endPos.y);
  }
}
