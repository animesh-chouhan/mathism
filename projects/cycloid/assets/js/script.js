var radius = window.innerHeight / 6;
var circleX = 0;
var circleY = (3 / 4) * window.innerHeight - radius;
var theta = -3.1416 / 2;

var vel = 8;
var omega = vel / radius;

var pointX;
var pointY;
let history = [];
const HIST = 2000 / vel;

function setup() {
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
    strokeWeight(8);
    circle(circleX, circleY, 2 * radius);

    strokeWeight(20);
    stroke('#96B196');
    pointX = circleX + radius * cos(theta);
    pointY = circleY + radius * sin(theta);
    point(pointX, pointY);


    var v = createVector(pointX, pointY);
    history.push(v);
    // console.log(history)
    if (history.length > HIST) {
        history.shift();
    }

    stroke(164, 194, 165, 180);
    strokeWeight(10);
    for (var i = 0; i < history.length; i++) {
        point(history[i].x, history[i].y);
    }

    circleX += vel;
    theta += omega;

    if (circleX > windowWidth + 15) {
        circleX = 0;
        theta = -3.1416 / 2;
        history = [];
    }

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}