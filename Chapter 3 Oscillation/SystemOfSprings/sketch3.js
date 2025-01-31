let particles = [];
let springs = [];
let k = 0.01;
let restLength = 100;

let gravity;

function setup() {
  // sliders
  kSlider = createSlider(0, 0.2, 0.01, 0.01);
  restLengthSlider = createSlider(10, 300, 100, 10);
  massSlider = createSlider(0, 10, 1, 1);

  createCanvas(600, 600);
  background(220);

  particles.push(new Particle(250, 100));
  particles.push(new Particle(350, 100));
  particles.push(new Particle(250, 200));
  particles.push(new Particle(350, 200));

  springs.push(new Spring(k, restLength, particles[0], particles[1]))
  springs.push(new Spring(k, restLength, particles[0], particles[2]))
  springs.push(new Spring(k, restLength, particles[3], particles[1]))
  springs.push(new Spring(k, restLength, particles[3], particles[2]))

  springs.push(new Spring(k, restLength*1.4, particles[0], particles[3]))
  springs.push(new Spring(k, restLength*1.4, particles[1], particles[2]))

  gravity = createVector(0, 0.1);
}

function draw() {
  background(220);

  for (spring of springs) {
    // sliders
    spring.k = kSlider.value();
    spring.restLength = restLengthSlider.value();

    spring.update();
    spring.show();
  }

  for (particle of particles) {
    // sliders
    particle.mass = massSlider.value();

    particle.edges();
    particle.applyForce(gravity);
    particle.update();
    particle.show();
  }
}