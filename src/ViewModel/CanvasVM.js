const dpr = window.devicePixelRatio || 1;
const radius = 50;

/**
 * Sets & scales canvas by dpr to fix blur.
 * 
 * @param {object} canvas - Canvas element itself.
 * @returns 
 */
export function setupCanvas(canvas) {
    const rect = canvas.current.getBoundingClientRect();
    const ctx = canvas.current.getContext('2d');

    canvas.current.width = rect.width * dpr;
    canvas.current.height = window.innerHeight * dpr;
    canvas.height = window.innerHeight * dpr;

    ctx.scale(dpr, dpr);
    return ctx;
}

/**
 * Draws a circle at mouseX, mouseY.
 * 
 * @param {object} ctx - The context of the canvas object.
 * @param {number} mouseX - X coordinate of the mouse.
 * @param {number} mouseY - Y coordinate of the mouse.
 */
export const circle = (ctx, mouseX, mouseY) => {
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, radius, 0, 2*Math.PI, false);
    ctx.fillStyle = '#299a9c';
    ctx.fill();
};

/**
 * Clears & redraws the canvas.
 * 
 * @param {object} canvas - The canvas element itself.
 * @param {number} mouseX - X coordinate of the mouse.
 * @param {number} mouseY - Y coordinate of the mouse.
 */
export function draw(canvas, mouseX, mouseY) {
    const ctx = canvas.current.getContext('2d');
    const rect = canvas.current.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    circle(ctx, mouseX, mouseY);
}

/**
 * Updates mouse coordinates & detects canvas edge.
 * 
 * @param {object} e - The event object.
 * @param {object} canvas - The canvas element itself.
 * @param {number} mouseX - X coordinate of the mouse.
 * @param {number} mouseY - Y coordinate of the mouse.
 */
export function trackMouse(e, canvas, setMouseX, setMouseY) {
    const rect = canvas.current.getBoundingClientRect();
    const leftEdgeCollision = e.clientX <= radius ? true : false;
    const rightEdgeCollision = e.clientX >= rect.width - radius ? true : false;
    const topEdgeCollision = e.clientY <= radius ? true : false;
    const bottomEdgeCollision = e.clientY >= rect.height - radius ? true : false;

    // Reset coords if mouse touches edge.
    if (leftEdgeCollision) {
        setMouseX(radius);
    } else if (topEdgeCollision) {
        setMouseY(radius);
    } else if (rightEdgeCollision) {
        setMouseX(rect.width - radius);
    } else if (bottomEdgeCollision) {
        setMouseY(rect.height - radius);
    } else {
        // In bounds. Update coords.
        setMouseX(e.clientX);
        setMouseY(e.clientY);
    }
}