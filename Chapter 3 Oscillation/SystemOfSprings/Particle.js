class Particle {
    constructor(x, y) {
        this.position = createVector(x, y)
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
    
        this.mass = 1;
    }

    applyForce(force) {
        let f = force.copy();
        f.div(this.mass)
        this.acceleration.add(f);
    }

    edges() {
        if (this.position.x < 0) {
            this.velocity.x *= -1;
            this.position.x = 0;
        } else if (this.position.x > width) {
            this.velocity.x *= -1;
            this.position.x = width;
        }

        if (this.position.y < 0) {
            this.velocity.y *= -1;
            this.position.y = 0;
        } else if (this.position.y > height) {
            this.velocity.y *= -1;
            this.position.y = height;
        }
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);

        this.velocity.mult(0.99);
        this.acceleration.mult(0);
    }

    show() {
        noStroke();
        fill(0);
        circle(this.position.x, this.position.y, 7);
    }
}