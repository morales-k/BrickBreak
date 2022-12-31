let initBallPosY;
let initBallPosX = randomNum();
export let initBallDY = -3;
export let ball = {
    x: 0,
    y: initBallPosY,
    dx: initBallPosX === 0 ? -3 : 3,
    dy: initBallDY,
};

/**
 * Returns 0 or 1.
 * 
 * @returns {Number}
 */
function randomNum() {
    return Math.floor(Math.random() * 2);
};


/**
 * Draws the ball.
 * 
 * @param {object} ctx - The context of the canvas object.
 */
export const drawBall = (ctx) => {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI, false);
    ctx.fillStyle = '#478CC4';
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
export function updateBall(ctx, rect, toggleModal, bounce, updatedBarX, barWidth, resetGame) {
    const barHeight = (12 / 100) * barWidth;
    initBallPosY = (window.innerHeight - (73.5 + barHeight));
    ball.radius = (1 / 100) * rect.width; // Add based on passed canvas size.

    if (bounce) {
        if (ball.x + ball.dx > rect.width - ball.radius || ball.x + ball.dx < ball.radius) {
            ball.dx = -ball.dx;
        }

        if (ball.y + ball.dy > rect.height - ball.radius || ball.y + ball.dy < ball.radius) {
            ball.dy = -ball.dy;
        }

        // Bounce ball off paddle if they collide.
        if (ball.x + ball.dx >= updatedBarX && 
            ball.x + ball.dx <= updatedBarX + barWidth && 
            ball.y + ball.dy === initBallPosY) {
            let num = randomNum();
            ball.dx = num === 0 ? ball.dx : -ball.dx;
            ball.dy = -ball.dy;
        }

        if (ball.y > initBallPosY) {
            resetGame();
            toggleModal(true);
            ball.y = initBallPosY;
            ball.dy = initBallDY;
        }

        ball.x += ball.dx;
        ball.y += ball.dy;
        drawBall(ctx);
    } else {
        ball.x = updatedBarX + (barWidth / 2);
        ball.y = initBallPosY;
        drawBall(ctx);
    }
}