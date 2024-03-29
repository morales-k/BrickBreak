import { createBrickArray, drawBrickField, detectBrickCollision, brickLayout } from "./BrickVM";
import { ball, initBallDY, updateBall } from "./BallVM";
import { drawBar, trackBar, calculateBarX } from "./PaddleVM";
import { setVolume, musicVolume, effectVolume, playBackgroundMusic, playEffect } from "./SoundVM";

const dpr = window.devicePixelRatio || 1;
export let score = 0;
export let restart = false;
let bounce = false;
let barX = 100;
let arrowStates = {
    leftArrow: false,
    rightArrow: false,
};
export let gameWon = false;
const maxLevel = 3;
let level = 1;

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
    playBackgroundMusic(musicVolume);
    return ctx;
}

/**
 * Handles all user events.
 * 
 * @param {object} e - The event object.
 */
export function handleEvent(e) {
    if (e.type === "touchmove") {
        arrowStates.leftArrow = false;
        arrowStates.rightArrow = false;
        barX = e.touches[0].clientX;
    }

    if (e.type === "mousemove") {
        arrowStates.leftArrow = false;
        arrowStates.rightArrow = false;
        barX = e.clientX;
    } 

    if ((e.type === "dblclick" || e.key === "ArrowUp") && !restart) {
        bounce = true;
    } else if (e.key === "ArrowLeft") {
         e.type === "keyup" ? arrowStates.leftArrow = false : arrowStates.leftArrow = true;
    } else if (e.key === "ArrowRight") {
        e.type === "keyup" ? arrowStates.rightArrow = false : arrowStates.rightArrow = true;
    }
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
    const brickWidth = ((rect.width - halfOfCanvas) / brickLayout.cols);
    const brickHeight = (18 / 100) * brickWidth;
    const barWidth = Math.floor((10 / 100) * rect.width);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // After clearing canvas, update brick, ball and bar positions.
    barX = calculateBarX(rect.width, barWidth, barX, arrowStates);
    let updatedBarX = trackBar(barWidth, barX, canvas);

    drawBrickField(ctx, rect.width, brickWidth, brickHeight, brickLayout);
    drawBar(ctx, barWidth, updatedBarX); 
    updateBall(ctx, rect, toggleModal, bounce, updatedBarX, barWidth, resetGame);

    // If a brick was destroyed, update the score.
    let updateScore = detectBrickCollision(ball, brickWidth, brickHeight);

    if (updateScore) {
        score += 10;
        if (brickLayout.remainingBricks === 0) {
            if (level !== maxLevel) {
                level += 1;
            } else {
                level = 1;
                gameWon = true;
            }

            restart = true;
            bounce = false;
            toggleModal(true);
            setVolume('music', 0);
            playEffect(effectVolume, 'win');
        }
    }
    drawScore(ctx);
    requestAnimationFrame(() => draw(canvas, toggleModal));
}

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
    gameWon = false;
    level = 1;
    restart = true;
    bounce = false;
}

/**
 * Resets bricks, score, ball.dy & sets restart to false.
 */
export function buildLevel() {
    gameWon = false;

    if (level === 1) {
        brickLayout.rows = 3;
        brickLayout.cols = 5;
        score = 0;
    } else if (level === 2) {
        brickLayout.rows = 4;
        brickLayout.cols = 5;
    } else if (level === 3) {
        brickLayout.rows = 5;
        brickLayout.cols = 5;
    }

    createBrickArray(brickLayout, level);
    restart = false;
    bounce = false;
    ball.dy = initBallDY;
}