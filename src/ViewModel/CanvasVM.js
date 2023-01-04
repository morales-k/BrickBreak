import { createBrickArray, drawBrickField, detectBrickCollision, remainingBricks, brickCols } from "./BrickVM";
import { ball, initBallDY, updateBall } from "./BallVM";

const dpr = window.devicePixelRatio || 1;
export let score = 0;
export let restart = false;
let bounce = false;
let barX = 100;
let arrowStates = {
    leftArrow: false,
    rightArrow: false,
};

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
    buildLevel();
    setCanvasReady(true);
    return ctx;
}

/**
 * Updates the bar movement based on keys & event type.
 * 
 * @param {object} e - The event object.
 */
export function handleBarMovement(e) {
    if (e.type === "mousemove") {
        arrowStates.leftArrow = false;
        arrowStates.rightArrow = false;
        barX = e.clientX;
    }

    if (e.key === "ArrowUp" && !restart) {
        bounce = true;
    } else if (e.key === "ArrowLeft") {
         e.type === "keyup" ? arrowStates.leftArrow = false : arrowStates.leftArrow = true;
    } else if (e.key === "ArrowRight") {
        e.type === "keyup" ? arrowStates.rightArrow = false : arrowStates.rightArrow = true;
    }
}

/**
 * Updates bar coordinates & detects canvas edge.
 * 
 * @param {Number} barWidth - The width of the bar as a % of the canvas.
 * @param {Number} barX - The X coordinate of the bar.
 * @param {object} canvas - The canvas element itself.
 * @returns Number;
 */
 function trackBar(barWidth, barX, canvas) {
    const rect = canvas.current.getBoundingClientRect();
    const leftEdgeCollision = barX <= 0 ? true : false;
    const rightEdgeCollision = barX >= rect.width - barWidth ? true : false;
    let updatedBarX = 0;

    // Reset coords if mouse touches edge.
    if (leftEdgeCollision) {
        updatedBarX = 0;
    } else if (rightEdgeCollision) {
        updatedBarX = rect.width - barWidth;
    } else {
        updatedBarX = barX;
    }

    return updatedBarX;
}

/**
 * Clears & redraws the canvas. Sets components size based on canvas size.
 * 
 * @param {object} canvas - The canvas element itself.
 * @param {function} toggleModal - Sets if the modal should display.
 */
export function draw(canvas, toggleModal) {
    const ctx = canvas.current.getContext('2d');
    const rect = canvas.current.getBoundingClientRect();
    const halfOfCanvas = (50 / 100) * rect.width;
    const brickWidth = ((rect.width - halfOfCanvas) / brickCols);
    const brickHeight = (18 / 100) * brickWidth;
    const barWidth = Math.floor((10 / 100) * rect.width);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Update bricks & bar/ball position after clearing canvas.
    let posX = arrowStates.leftArrow === true ? barX -= 10 : arrowStates.rightArrow ? barX += 10 : barX;
    let updatedBarX = trackBar(barWidth, posX, canvas);
    barX = posX;

    drawBrickField(ctx, rect.width, brickWidth, brickHeight);
    drawBar(ctx, barWidth, updatedBarX); 
    updateBall(ctx, rect, toggleModal, bounce, updatedBarX, barWidth, resetGame);

    // If a brick was destroyed, update the score.
    let updateScore = detectBrickCollision(ball, brickWidth, brickHeight);

    if (updateScore) {
        score += 10;
        if (remainingBricks === 0) {
            restart = true;
            bounce = false;
            toggleModal(true);
        }
    }
    drawScore(ctx);
    requestAnimationFrame(() => draw(canvas, toggleModal));
}

/**
 * Draws a rectangle with it's origin begining at updatedBarX.
 * 
 * @param {object} ctx - The context of the canvas object.
 * @param {Number} barWidth - The width of the bar as a % of the canvas.
 * @param {number} updatedBarX - X coordinate of the mouse.
 */
const drawBar = (ctx, barWidth, updatedBarX) => {
    const barHeight = (12 / 100) * barWidth;
    ctx.beginPath();
    ctx.rect(updatedBarX, (window.innerHeight - 75), barWidth, barHeight);
    ctx.fillStyle = '#51526B';
    ctx.fill();
    ctx.strokeStyle = '#48485E';
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
    ctx.fillText(`Score: ${score}`, 20, 30);
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
    bounce = false;
    score = 0;
    ball.dy = initBallDY;
}