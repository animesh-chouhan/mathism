const particles = [];
const vel_range = 3;
const vel_factor = 5;
const colors = ['#FCD581', '#92DCE5', '#FAB3A9', '#7FB285'];

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Less load on mobile devices
    let number;
    if (window.screen.width < 600) {
        number = Math.floor(window.screen.width / 10);
    } else {
        number = Math.floor(window.screen.width / 15);
    }

    for (let i = 0; i < number; i++) {
        x = random(windowWidth);
        y = random(windowHeight);
        r = 2 * log(windowWidth);
        c = random(colors);
        particles.push(new Particle(x, y, r, c));
    }
}

function draw() {
    background(0);
    particles.forEach((p, index) => {
        p.show();
        p.update();
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}

class Particle {
    constructor(a, b, c = 10, d = '#FCD581') {
        // Color
        this.color = d;
        // Position
        this.radius = c;
        this.pos = createVector(a, b);
        // Velocity
        this.vel = createVector(random(-vel_range, vel_range), random(-vel_range, vel_range));
    }

    show() {
        fill(this.color);
        circle(this.pos.x, this.pos.y, this.radius)
    }

    update() {
        if (mouseIsPressed) {
            this.pos.x += this.vel.x * vel_factor;
            this.pos.y += this.vel.y * vel_factor;
        } else {
            this.pos.add(this.vel);
        }

        this.edges();
    }

    edges() {
        if (this.pos.x < 0 || this.pos.x > windowWidth) {
            this.vel.x *= -1;
        }
        if (this.pos.y < 0 || this.pos.y > windowHeight) {
            this.vel.y *= -1;
        }
    }
}