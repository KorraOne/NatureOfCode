class Sensor {
    constructor(mold, angle, distance) {
        this.mold = mold

        this.angle = angle;
        this.distance = distance
        this.position;
        this.rVal;
    }

    edges() {
        this.position.x = (this.position.x + width) % width
        this.position.y = (this.position.y + height) % height
    }

    sense() {
        index = getIndex(this.position.x, this.position.y);
        this.rVal = pixels[index];
    }

    update() {
        let direction = createVector(cos(this.angle + this.mold.angle), sin(this.angle + this.mold.angle));
        direction.mult(this.distance);
        this.position = p5.Vector.add(this.mold.position, direction)
        this.edges();

        this.sense();
    }

    show() {
        fill(0, 255, 255);
        circle(this.position.x, this.position.y, 0.4);
    }
}