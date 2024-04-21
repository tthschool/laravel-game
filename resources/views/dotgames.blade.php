<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Elastic Collision</title>
<style>
    canvas {
        border: 1px solid black;
    }
</style>
</head>
<body>
<canvas id="myCanvas" width="800" height="600"></canvas>

<script>
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Define Circle class
class Circle {
    constructor(x, y, radius, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        // Check collision with walls
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
    }
}

// Create two circles
const circle1 = new Circle(100, 300, 50, 2, 1, "blue");
const circle2 = new Circle(600, 300, 50, -2, -1, "red");

// Function to detect collision between circles
function detectCollision(circle1, circle2) {
    const distanceX = circle1.x - circle2.x;
    const distanceY = circle1.y - circle2.y;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < circle1.radius + circle2.radius) {
        return true; // Collision detected
    }

    return false; // No collision
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
    const impulse = -2 * velAlongNormal / (1 / circle1.radius + 1 / circle2.radius);

    // Apply impulse to circles
    circle1.dx -= impulse / circle1.radius * unitNormalX;
    circle1.dy -= impulse / circle1.radius * unitNormalY;
    circle2.dx += impulse / circle2.radius * unitNormalX;
    circle2.dy += impulse / circle2.radius * unitNormalY;
}

// Update function
function update() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw circles
    circle1.draw();
    circle2.draw();

    // Update circles
    circle1.update();
    circle2.update();

    // Check for collision
    if (detectCollision(circle1, circle2)) {
        // Handle elastic collision
        handleCollision(circle1, circle2);
    }

    // Request animation frame
    requestAnimationFrame(update);
}

// Start the animation loop
update();
</script>
</body>
</html>
