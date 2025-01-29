class Box{
    constructor() {
        this.position = createVector(width/2, height/2);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
    }

    applyForce(force) {
        let newForce = p5.Vector.div(force, this.mass);
        this.acceleration.add(newForce);
    }

    edges() {
        if (this.position.x < 0) {
            this.position.x = width;
        } else if (this.position.x > width) {
            this.position.x = 0;
        }

        if (this.position.y < 0) {
            this.position.y = height
        } else if (this.position.y > height) {
            this.position.y = 0;
        }
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);

        // reset acceleration each update loop
        this.acceleration.mult(0);

        // adds some friction
        this.velocity.mult(0.99);
    }

    show() {
        rectMode(CENTER);
        rect(this.position.x, this.position.y, 200, 200);
    }
}