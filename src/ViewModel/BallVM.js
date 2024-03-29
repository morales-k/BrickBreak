import { effectVolume, playEffect, setVolume } from "./SoundVM";
let initBallPosY;
let initBallPosX = randomNum();
export let initBallDY = -5;
export let ball = {
    x: 0,
    y: initBallPosY,
    dx: initBallPosX === 0 ? -5 : 5,
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
    ctx.lineWidth = 1;
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
    initBallPosY = Math.floor((window.innerHeight - 75) - ball.radius);
    ball.radius = Math.floor((1 / 100) * rect.width); // Add based on passed canvas size.

    if (bounce) {
        // Bounce ball off paddle if they collide.
        if (ball.x + ball.dx >= updatedBarX && 
            ball.x + ball.dx <= updatedBarX + barWidth && 
            ball.y + ball.dy === initBallPosY) {
            handlePaddleCollision(ball, barWidth, updatedBarX);
        }

        if (ball.x + ball.dx > rect.width - ball.radius || ball.x + ball.dx < ball.radius) {
            ball.dx = -ball.dx;
        }

        if (ball.y + ball.dy > rect.height - ball.radius || ball.y + ball.dy < ball.radius) {
            ball.dy = -ball.dy;
        }

        if (ball.y + ball.dy > initBallPosY) {
            resetGame();
            toggleModal(true);
            setVolume('music', 0);
            playEffect(effectVolume, 'lose');
            ball.y = initBallPosY;
            ball.dy = initBallDY;
        }

        ball.x += ball.dx;
        ball.y += ball.dy;
        drawBall(ctx);
    } else {
        ball.x = Math.floor(updatedBarX + (barWidth / 2));
        ball.y = initBallPosY;
        drawBall(ctx);
    }
}

/**
 * Updates ball dx based on where the ball collides with the paddle.
 * 
 * @param {Object} ball - {x, y, dx, dy, radius}
 * @param {Number} barWidth - Total width of the paddle.
 * @param {Number} updatedBarX - The paddles current X origin.
 */
function handlePaddleCollision(ball, barWidth, updatedBarX) {
    const areaWidth = barWidth / 5;
    const outsideLeftEnd = updatedBarX + areaWidth;
    const innerLeftStart = outsideLeftEnd + 1;
    const innerLeftEnd = innerLeftStart + areaWidth;
    const centerStart = innerLeftEnd + 1;
    const centerEnd = centerStart + areaWidth;
    const innerRightStart = centerEnd + 1;
    const innerRightEnd = innerRightStart + areaWidth;
    const outsideRightStart = innerRightEnd + 1;
    const outsideRightEnd = outsideRightStart + areaWidth;

    if (ball.x >= updatedBarX && ball.x <= outsideLeftEnd) {
        ball.dx = -Math.abs(initBallDY);
    } else if (ball.x >= innerLeftStart && ball.x <= innerLeftEnd) {
        ball.dx = -Math.abs(initBallDY + 3);
    } else if (ball.x >= centerStart && ball.x <= centerEnd) {
        ball.dx = 0;
    } else if (ball.x >= innerRightStart && ball.x <= innerRightEnd) {
        ball.dx = Math.abs(initBallDY + 3);
    } else if (ball.x >= outsideRightStart && ball.x <= outsideRightEnd) {
        ball.dx = Math.abs(initBallDY);
    }

    ball.dy = -ball.dy;
}