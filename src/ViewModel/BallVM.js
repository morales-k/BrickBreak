export let radius = 14;
let initBallPosY = window.innerHeight - (100 + radius);
export let initBallDY = -3;
export let ball = {
    x: 0,
    y: initBallPosY,
    dx: 3,
    dy: initBallDY,
    radius: radius,
};


/**
 * Draws the ball.
 * 
 * @param {object} ctx - The context of the canvas object.
 */
export const drawBall = (ctx) => {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI, false);
    ctx.fillStyle = '#7C9CA3';
    ctx.fill();
    ctx.strokeStyle = '#4E6266';
    ctx.lineWidth = 1.5;
    ctx.stroke();
};

/**
 * If bounce is true, reverses ball direction if an edge is hit.
 * Else, sets ballX to bar center.
 * 
 * @param {object} ctx - The context of the canvas object.
 * @param {object} rect - The bounding rect of the canvas.
 * @param {Function} toggleModal - Sets if the modal should display.
 */
export function updateBall(ctx, rect, toggleModal, bounce, mouseX, barWidth, resetGame) {
    if (bounce) {
        if (ball.x + ball.dx > rect.width - radius || ball.x + ball.dx < radius) {
            ball.dx = -ball.dx;
        }

        if (ball.y + ball.dy > rect.height - radius || ball.y + ball.dy < radius) {
            ball.dy = -ball.dy;
        }

        // Bounce ball off paddle if they collide.
        if (ball.x + ball.dx >= mouseX && 
            ball.x + ball.dx <= mouseX + barWidth && 
            ball.y + ball.dy === initBallPosY) {
            let direction = Math.floor(Math.random() * 2);
            ball.dx = direction === 0 ? ball.dx : -ball.dx;
            ball.dy = -ball.dy;
        }

        if (ball.y > initBallPosY) {
            resetGame();
            toggleModal(true);
            ball.y = initBallPosY;
            ball.dy = 3;
        }

        ball.x += ball.dx;
        ball.y += ball.dy;
        drawBall(ctx);
    } else {
        ball.x = mouseX + (barWidth / 2);
        ball.y = initBallPosY;
        drawBall(ctx);
    }
}