const dpr = window.devicePixelRatio || 1;
export const radius = 14;
export const barWidth = 120;
export let mouseX = 100;
let bounce = false;
let dx = 2;
let dy = -2;
let initBallPosY = window.innerHeight - (100 + radius);
let ballX = mouseX + (barWidth / 2);
let ballY = initBallPosY;

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
    setCanvasReady(true);
    return ctx;
}

/**
 * Handles key press events.
 * 
 * @param {string} key - Pressed key.
 */
export function handleKeys(key) {
    if (key === " ") {
        bounce = true;
    }
}

/**
 * Clears & redraws the canvas.
 * 
 * @param {object} canvas - The canvas element itself.
 * @param {function} setModal - Sets if the modal should display.
 */
export function draw(canvas, setModal) {
    const ctx = canvas.current.getContext('2d');
    const rect = canvas.current.getBoundingClientRect();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    bar(ctx, mouseX); 
    updateBall(ctx, rect, setModal);
}

/**
 * If bounce is true, reverses ball direction if an edge is hit.
 * Else, sets ballX to bar center.
 * 
 * @param {object} ctx - The context of the canvas object.
 * @param {object} rect - The bounding rect of the canvas.
 * @param {object} setModal - Sets if the modal should display.
 */
function updateBall(ctx, rect, setModal) {
    if (bounce) {
        if (ballX + dx > rect.width - radius || ballX + dx < radius) {
            dx = -dx;
        }

        if (ballY + dy > rect.height - radius || ballY + dy < radius) {
            dy = -dy;
        }

        if (ballX + dx >= mouseX && 
            ballX + dx <= mouseX + barWidth && 
            ballY + dy === initBallPosY) {
            dx = -dx;
            dy = -dy;
        }

        if (ballY + dy > initBallPosY) {
            bounce = false;
            setModal(true);
        }

        ballX += dx;
        ballY += dy;
        ball(ctx);
    } else {
        ballX = mouseX + (barWidth / 2);
        ballY = initBallPosY;
        ball(ctx);
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
 * Draws the ball.
 * 
 * @param {object} ctx - The context of the canvas object.
 */
 export const ball = (ctx) => {
    ctx.beginPath();
    ctx.arc(ballX, ballY, radius, 0, 2*Math.PI, false);
    ctx.fillStyle = '#7C9CA3';
    ctx.fill();
    ctx.strokeStyle = '#4E6266';
    ctx.lineWidth = 1.5;
    ctx.stroke();
};

/**
 * Draws a rectangle with it's origin begining at mouseX.
 * 
 * @param {object} ctx - The context of the canvas object.
 * @param {number} mouseX - X coordinate of the mouse.
 */
 export const bar = (ctx, mouseX) => {
    ctx.beginPath();
    ctx.rect(mouseX, (window.innerHeight - 100), barWidth, 25);
    ctx.fillStyle = '#749981';
    ctx.fill();
    ctx.strokeStyle = '#4A6152';
    ctx.lineWidth = 1.5;
    ctx.lineJoin = "round";
    ctx.stroke();
};