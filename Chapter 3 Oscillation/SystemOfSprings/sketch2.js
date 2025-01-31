let particles = []; amount = 10;
let springs = [];
let k = 0.01;
let restLength = 1;
let tail;

let gravity;

function setup() {
  createCanvas(600, 600);
  
    for (i=0; i<amount; i++) {
        particles.push(new Particle(i*restLength + 20, 60));

        if (!i == 0) {
            a = particles[i];
            b = particles[i - 1];
            springs.push(new Spring(k, restLength, a, b));
        }
    }

  gravity = createVector(0, 0.1);

  tail = particles[particles.length-1];
  head = particles[0];
}

function draw() {
    background(220);

    tail.position.set(mouseX, mouseY);
    tail.velocity.set(0, 0);

    for (spring of springs) {
        spring.update();
        spring.show();
    }

    for (particle of particles) {
        particle.applyForce(gravity);
        particle.edges();
        particle.update(0);
        particle.show();
    }

}
