import { createBrickArray, drawBrickField, detectBrickCollision, remainingBricks } from "./BrickVM";
import { ball, initBallDY, updateBall } from "./BallVM";

const dpr = window.devicePixelRatio || 1;
export const barWidth = 120;
export let mouseX = 100;
export let score = 0;
export let restart = false;
let bounce = false;

/**
 * Sets & scales canvas by dpr to fix blur.
 * 
 * @param {object} canvas - Canvas element itself.
 * @returns 
 */
export function setupCanvas(canvas, setCanvasReady) {
    const rect = canvas.current.getBoundingClientRect();
    const ctx = canvas.current.getContext('2d');

    canvas.current.width = rect.width * dpr;
    canvas.current.height = window.innerHeight * dpr;
    canvas.height = window.innerHeight * dpr;

    ctx.scale(dpr, dpr);
    createBrickArray();
    setCanvasReady(true);
    return ctx;
}

/**
 * Handles key press events. Blurs restart button to prevent space from starting game.
 * 
 * @param {string} key - Pressed key.
 */
export function handleKeys(key) {
    if (document.activeElement.classList.contains("restart-btn")) {
        document.activeElement.blur();
    }

    if (key === " " && !restart) {
        bounce = true;
    }
}

/**
 * Updates mouse coordinates & detects canvas edge.
 * 
 * @param {object} e - The event object.
 * @param {object} canvas - The canvas element itself.
 */
 export function trackMouse(e, canvas) {
    const rect = canvas.current.getBoundingClientRect();
    const leftEdgeCollision = e.clientX <= 0 ? true : false;
    const rightEdgeCollision = e.clientX >= rect.width - barWidth ? true : false;

    // Reset coords if mouse touches edge.
    if (leftEdgeCollision) {
        mouseX = 0;
    } else if (rightEdgeCollision) {
        mouseX = rect.width - barWidth;
    } else {
        mouseX = e.clientX;
    }
}

/**
 * Clears & redraws the canvas.
 * 
 * @param {object} canvas - The canvas element itself.
 * @param {function} toggleModal - Sets if the modal should display.
 */
export function draw(canvas, toggleModal) {
    const ctx = canvas.current.getContext('2d');
    const rect = canvas.current.getBoundingClientRect();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    drawBrickField(ctx);
    drawBar(ctx, mouseX); 
    updateBall(ctx, rect, toggleModal, bounce, mouseX, barWidth, resetGame);
    let updateScore = detectBrickCollision(ball);

    if (updateScore) {
        score += 10;
        if (remainingBricks === 0) {
            restart = true;
            bounce = false;
            toggleModal(true);
        }
    }
    drawScore(ctx);
}

/**
 * Draws a rectangle with it's origin begining at mouseX.
 * 
 * @param {object} ctx - The context of the canvas object.
 * @param {number} mouseX - X coordinate of the mouse.
 */
const drawBar = (ctx, mouseX) => {
    ctx.beginPath();
    ctx.rect(mouseX, (window.innerHeight - 100), barWidth, 25);
    ctx.fillStyle = '#749981';
    ctx.fill();
    ctx.strokeStyle = '#4A6152';
    ctx.lineWidth = 1.5;
    ctx.lineJoin = "round";
    ctx.stroke();
};

/**
 * Displays the score.
 * 
 * @param {object} ctx - The context of the canvas object.
 */
const drawScore = (ctx) => {
    ctx.font = "16px Helvetica";
    ctx.fillStyle = "#000";
    ctx.fillText(`Score: ${score}`, 8, 20);
}

/**
 * Creates new brick layout, resets game flags & reverses ballY 
 * direction for next playthrough.
 */
export function resetGame() {
    restart = true;
    bounce = false;
}

/**
 * Resets bricks, score, ball.dy & sets restart to false.
 */
export function buildLevel() {
    createBrickArray();
    restart = false;
    score = 0;
    ball.dy = initBallDY;
}