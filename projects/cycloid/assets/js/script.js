var radius = window.innerHeight / 6;
var circleX = radius;
var circleY = (3 / 4) * window.innerHeight - radius - 4;
var theta = 0;
var vel = 2;
var omega = vel / radius;

function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background('#FBFFF1');

    noStroke();
    fill('#2E3138');
    rect(0, (3 / 4) * windowHeight, windowWidth, (3 / 4) * windowHeight);


    // noFill();
    fill(250);
    stroke('#2E3138');
    strokeWeight(10);
    circle(circleX, circleY, 2 * radius);
    circleX += vel;

    strokeWeight(20);
    stroke('#A4C2A5');
    point(circleX + radius * cos(theta), circleY + radius * sin(theta));
    theta += omega;

    if (circleX > windowWidth) {
        circleX = 0
    }

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}