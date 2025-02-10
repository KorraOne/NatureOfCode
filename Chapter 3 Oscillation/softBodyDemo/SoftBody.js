class SoftBody {
  constructor(x, y, width, height, k) {
    this.frameParticles = [];
    this.particles = []
    this.springs = [];
    
    this.particles.push(new Particle(x         , y));
    this.particles.push(new Particle(x + width , y));
    this.particles.push(new Particle(x         , y + height));
    this.particles.push(new Particle(x + width , y + height));

    this.particles.push(new Particle(x + width*0.5, y - height*0.2));
    this.particles.push(new Particle(x + width*1.2, y + height*0.5));
    this.particles.push(new Particle(x + width*0.5, y + height*1.2));
    this.particles.push(new Particle(x - width*0.2, y + height*0.5));


    this.frameParticles.push(new FrameParticle(x            , y             , this));
    this.frameParticles.push(new FrameParticle(x + width    , y             , this));
    this.frameParticles.push(new FrameParticle(x            , y + height    , this));
    this.frameParticles.push(new FrameParticle(x + width    , y + height    , this));

    this.frameParticles.push(new FrameParticle(x + width*0.5, y - height*0.2, this));
    this.frameParticles.push(new FrameParticle(x + width*1.2, y + height*0.5, this));
    this.frameParticles.push(new FrameParticle(x + width*0.5, y + height*1.2, this));
    this.frameParticles.push(new FrameParticle(x - width*0.2, y + height*0.5, this));



    // for (let i=0; i<15; i++) {
    //   this.particles.push(new Particle(random(width), random(height)));
    // }

    // adds a spring between each joint
    // fix - due to o2 style loop, each connection is two springs -> should be one
    for (let p1 of this.particles) {
      for (let p2 of this.particles) {
        this.springs.push(new Spring(k, p5.Vector.sub(p1.position, p2.position).mag(), p1, p2))
      }
    }

    if (this.particles.length === this.frameParticles.length) {
      for (let i=0; i<this.particles.length; i++) {
        this.springs.push(new Spring(k*10, p5.Vector.sub(this.particles[i].position, this.frameParticles[i].position).mag(), this.particles[i], this.frameParticles[i]));
      }
    }
  }

  expand() {
    let middle = this.averagePosition();

    // for (let particle of this.particles) {
    //   particle.expand(middle);
    // }

    if (this.particles.length === this.frameParticles.length) {
      for (let i=0; i<this.particles.length; i++) {
        this.particles[i].expand(middle, this.frameParticles[i].position);
      }
    }
  }
 
  averagePosition() {
    let totalVect = createVector(0, 0);
    let count = 0;

    for (let particle of this.particles) {
      totalVect.add(particle.position);
      count++;
    }

    totalVect.div(count);
    circle(totalVect.x, totalVect.y, 20);
    return totalVect
  }

  edges() {
    for (let particle of this.particles) {
      particle.edges();
    }
  }

  applyForce(force) {
    for (let particle of this.particles) {
      particle.applyForce(force);
    }
  }

  update() { 
    for (let frameParticle of this.frameParticles) {
      frameParticle.move();
    }

    for (let particle of this.particles) {
      particle.update();
      particle.applyGravity();
    }
    
    for (let spring of this.springs) {
      spring.update();
    }
  }

  show() {
    this.averagePosition();

    for (let frameParticle of this.frameParticles) {
      // frameParticle.show();
    }

    for (let particle of this.particles) {
      // particle.show();
    }
    
    for (let spring of this.springs) {
      spring.show();
    }
  }
}


// spring joints between original shaped soft body object during development
// this.springs.push(new Spring(k, p5.Vector.sub(this.particles[0].position, this.particles[1].position).mag(), this.particles[0], this.particles[1]))
// this.springs.push(new Spring(k, p5.Vector.sub(this.particles[0].position, this.particles[2].position).mag(), this.particles[0], this.particles[2]))
// this.springs.push(new Spring(k, p5.Vector.sub(this.particles[3].position, this.particles[2].position).mag(), this.particles[3], this.particles[1]))
// this.springs.push(new Spring(k, p5.Vector.sub(this.particles[3].position, this.particles[2].position).mag(), this.particles[3], this.particles[2]))

// this.springs.push(new Spring(k, p5.Vector.sub(this.particles[0].position, this.particles[3].position).mag(), this.particles[0], this.particles[3]))
// this.springs.push(new Spring(k, p5.Vector.sub(this.particles[1].position, this.particles[2].position).mag(), this.particles[1], this.particles[2]))

// this.springs.push(new Spring(k, p5.Vector.sub(this.particles[0].position, this.particles[4].position).mag(), this.particles[0], this.particles[4]))
// this.springs.push(new Spring(k, p5.Vector.sub(this.particles[1].position, this.particles[4].position).mag(), this.particles[1], this.particles[4]))
// this.springs.push(new Spring(k, p5.Vector.sub(this.particles[2].position, this.particles[4].position).mag(), this.particles[2], this.particles[4]))
// this.springs.push(new Spring(k, p5.Vector.sub(this.particles[3].position, this.particles[4].position).mag(), this.particles[3], this.particles[4]))

// this.springs.push(new Spring(k, p5.Vector.sub(this.particles[0].position, this.particles[5].position).mag(), this.particles[0], this.particles[5]))
// this.springs.push(new Spring(k, p5.Vector.sub(this.particles[1].position, this.particles[5].position).mag(), this.particles[1], this.particles[5]))
// this.springs.push(new Spring(k, p5.Vector.sub(this.particles[2].position, this.particles[5].position).mag(), this.particles[2], this.particles[5]))
// this.springs.push(new Spring(k, p5.Vector.sub(this.particles[3].position, this.particles[5].position).mag(), this.particles[3], this.particles[5]))

// this.springs.push(new Spring(k, p5.Vector.sub(this.particles[0].position, this.particles[6].position).mag(), this.particles[0], this.particles[6]))
// this.springs.push(new Spring(k, p5.Vector.sub(this.particles[1].position, this.particles[6].position).mag(), this.particles[1], this.particles[6]))
// this.springs.push(new Spring(k, p5.Vector.sub(this.particles[2].position, this.particles[6].position).mag(), this.particles[2], this.particles[6]))
// this.springs.push(new Spring(k, p5.Vector.sub(this.particles[3].position, this.particles[6].position).mag(), this.particles[3], this.particles[6]))

// this.springs.push(new Spring(k, p5.Vector.sub(this.particles[0].position, this.particles[7].position).mag(), this.particles[0], this.particles[7]))
// this.springs.push(new Spring(k, p5.Vector.sub(this.particles[1].position, this.particles[7].position).mag(), this.particles[1], this.particles[7]))
// this.springs.push(new Spring(k, p5.Vector.sub(this.particles[2].position, this.particles[7].position).mag(), this.particles[2], this.particles[7]))
// this.springs.push(new Spring(k, p5.Vector.sub(this.particles[3].position, this.particles[7].position).mag(), this.particles[3], this.particles[7]))
