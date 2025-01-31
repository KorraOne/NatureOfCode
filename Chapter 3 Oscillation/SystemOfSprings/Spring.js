class Spring {
    constructor(k, restLength, particleA, particleB) {
        this.k = k;
        this.restLength = restLength;
        this.a = particleA;
        this.b = particleB;
    }

    update() {
        let force = p5.Vector.sub(this.a.position, this.b.position);
        let x = force.mag() - this.restLength;
        force.normalize();
        force.mult(-1 * this.k * x);

        let aForce = p5.Vector.copy(force);
        let bForce = p5.Vector.copy(force);

        aForce.div(this.a.mass);
        bForce.div(this.b.mass);
        bForce.mult(-1);

        this.a.applyForce(aForce);
        this.b.applyForce(bForce);
    }

    show() {
        strokeWeight(1);
        stroke(0);
        line(this.a.position.x, this.a.position.y, this.b.position.x, this.b.position.y);
    }
}