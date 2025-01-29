class Mold{
    constructor(x, y) {
        this.position = createVector(x, y)
        this.velocity = createVector(0, 0);
        
        this.angle = random(TWO_PI);
        this.radius = 0.5;

        this.leftSensor = new Sensor(this, -PI/4, 10);
        this.frontSensor = new Sensor(this, 0, 10);
        this.rightSensor = new Sensor(this, PI/4, 10);
    }

    edges() {
        this.position.x = (this.position.x + width) % width;
        this.position.y = (this.position.y + height) % height;
    }

    update() {
        this.edges();
        this.velocity = createVector(cos(this.angle), sin(this.angle))
        this.velocity.setMag(1);
        this.position.add(this.velocity);

        this.leftSensor.update();
        this.frontSensor.update();
        this.rightSensor.update();

        this.leftSensor.sense();
        this.frontSensor.sense();
        this.rightSensor.sense();


        let val = max(this.leftSensor.rVal, this.frontSensor.rVal, this.rightSensor.rVal);
        if (val == this.frontSensor.rVal) {
            this.angle += 0;
        } else if (val == this.leftSensor.rVal) {
            this.angle -= PI/4;
        } else if (val == this.rightSensor.rVal) {
            this.angle += PI/4;
        } else {
            console.log('error in choosing sensors, Mold.js - line 42');
        }
    }

    show() {
        noStroke();
        fill(255, 0, 0);
        circle(this.position.x, this.position.y, this.radius*2)

        // this.leftSensor.show();
        // this.frontSensor.show();
        // this.rightSensor.show();
    }
}