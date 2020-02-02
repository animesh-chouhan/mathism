const color = {
    background: "#0C2233",
    particles: "#03DAC6",
    stroke: "3,218,198"
}

const particles_prop = {
    vel_range: 3,
    vel_factor: 4,
    vel_halo: 0.2,
    radius_factor: 3
}

const particles = [];

function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);

    // Less load on mobile devices
    let number;
    if (window.screen.width < 600) {
        number = Math.floor(window.screen.width / 50);
    } else {
        number = Math.floor(window.screen.width / 10);
    }

    for (let i = 0; i < number; i++) {
        r = 5 * log(windowWidth);
        x = random(r, windowWidth - r);
        y = random(r, windowHeight - r);
        particles.push(new Particle(x, y, r, color.particles));
    }
}

function draw() {
    background(color.background);
    particles.forEach((p, index) => {
        p.show();
        p.update();
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}

class Particle {
    constructor(a, b, c = 10, d) {
        // Color
        this.color = d;
        this.halo_alpha = 200;
        // Position
        this.radius = c;
        this.pos = createVector(a, b);
        this.halo = c;
        // Velocity
        this.vel = createVector(random(-particles_prop.vel_range, particles_prop.vel_range), random(-particles_prop.vel_range, particles_prop.vel_range));
        this.halo_vel = particles_prop.vel_halo;
    }

    show() {
        noStroke();
        fill(this.color);
        circle(this.pos.x, this.pos.y, this.radius);
        // noFill();
        // stroke(3, 218, 198, this.halo_alpha);
        fill(3, 218, 198, this.halo_alpha);
        // strokeWeight(this.radius / 10);
        circle(this.pos.x, this.pos.y, this.halo);
    }

    update() {
        if (mouseIsPressed) {
            this.pos.x += this.vel.x * particles_prop.vel_factor;
            this.pos.y += this.vel.y * particles_prop.vel_factor;
            this.halo += this.halo_vel * particles_prop.vel_factor;
            this.halo_alpha -= particles_prop.vel_factor * this.radius / 200;
        } else {
            this.pos.add(this.vel);
            this.halo += this.halo_vel;
            this.halo_alpha -= this.radius / 200;

        }

        this.edges();
    }

    edges() {
        // Bouncing back effect
        if (this.pos.x < this.radius || this.pos.x > windowWidth - this.radius) {
            this.vel.x *= -1;
        }
        if (this.pos.y < this.radius || this.pos.y > windowHeight - this.radius) {
            this.vel.y *= -1;
        }
        // Reset halo
        if (this.halo_alpha < 0) {
            this.halo = this.radius;
            this.halo_alpha = 200;
        }
    }
}