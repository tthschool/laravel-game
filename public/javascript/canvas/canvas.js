const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

var mouse= {
    x : undefined,
    y :undefined,
}

window.addEventListener("mousemove" , function(e){
    mouse.x = e.x;
    mouse.y = e.y;
})
class Circle {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
    }
    update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

class Drawline {
    constructor(x, y, z, k) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.k = k;
    }
    draw() {
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(this.z, this.k);
        c.stroke();
    }
    update() {
        this.draw();
    }
}
var colors = ["#F29F05", "#0A3A40", "#0F5959", "#F20505", "#107361"];
var circles = [];
function checkcollision(circle_a, circle_b) {
    let a = Math.pow(circle_a.x - circle_b.x, 2);
    let b = Math.pow(circle_a.y - circle_b.y, 2);
    let c = Math.sqrt(a + b);
    let totalradius = circle_a.radius + circle_b.radius;
    if (c < totalradius) {
        return true;
    }
}
function checkcollisionwithmouse(circle,mouse){
    if(mouse.x - circle.x < 80){
        return true;
    }
}

// Function to handle elastic collision
function handleCollision(circle1, circle2) {
    // Calculate relative velocity
    const relVelX = circle2.dx - circle1.dx;
    const relVelY = circle2.dy - circle1.dy;

    // Calculate normal vector
    const normalX = circle2.x - circle1.x;
    const normalY = circle2.y - circle1.y;

    // Normalize normal vector
    const normalLength = Math.sqrt(normalX * normalX + normalY * normalY);
    const unitNormalX = normalX / normalLength;
    const unitNormalY = normalY / normalLength;

    // Calculate relative velocity along the normal
    const velAlongNormal = relVelX * unitNormalX + relVelY * unitNormalY;

    // If the circles are moving away from each other, do nothing
    if (velAlongNormal > 0) {
        return;
    }

    // Calculate impulse scalar
    const impulse =
        (-2 * velAlongNormal) / (1 / circle1.radius + 1 / circle2.radius);

    // Apply impulse to circles
    circle1.dx -= (impulse / circle1.radius) * unitNormalX;
    circle1.dy -= (impulse / circle1.radius) * unitNormalY;
    circle2.dx += (impulse / circle2.radius) * unitNormalX;
    circle2.dy += (impulse / circle2.radius) * unitNormalY;
}

function init() {
    for (let i = 0; i < 10; i++) {
        var radius = 30;
        var x = Math.random() * (window.innerWidth - radius * 2) + radius;
        var y = Math.random() * (window.innerHeight - radius * 2) + radius;
        var dx = Math.round(Math.random() * 5 + 1);
        var dy = Math.round(Math.random() * 5 + 1);
        var colorIndex = Math.floor(Math.random() * colors.length);
        var color = colors[colorIndex];
        var circle = new Circle(x, y, dx, dy, radius, color);
        circles.push(circle);
    }
}
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < circles.length; i++) {
        circles[i].update();
    }
    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {
            if (checkcollision(circles[i], circles[j])) {
                handleCollision(circles[i], circles[j]);
            }
        }
        if(checkcollisionwithmouse(circles[i] , mouse)){
            circles[i].color = "black"
        }

    }
}
init();
animate();
