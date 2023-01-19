/**
 * Draws a rectangle with it's origin begining at updatedBarX.
 * 
 * @param {object} ctx - The context of the canvas object.
 * @param {Number} barWidth - The width of the bar as a % of the canvas.
 * @param {number} updatedBarX - X coordinate of the mouse.
 */
export const drawBar = (ctx, barWidth, updatedBarX) => {
    const barHeight = Math.floor((12 / 100) * barWidth);
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
 * Updates bar coordinates & detects canvas edge.
 * 
 * @param {Number} barWidth - The width of the bar as a % of the canvas.
 * @param {Number} barX - The X coordinate of the bar.
 * @param {Object} canvas - The canvas element itself.
 * @returns Number;
 */
export function trackBar(barWidth, barX, canvas) {
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
 * Calculates & returns the current bar position.
 * 
 * @param {Number} maxWidth - The width of the canvas bounding rect.
 * @param {Number} barWidth - The width of the bar.
 * @param {Number} barX - Origin of the x-coord of the bar.
 * @param {object} arrowStates - Object indicating if left or right arrow key is currently pressed.
 * @returns 
 */
export function calculateBarX(maxWidth, barWidth, barX, arrowStates) {
    let updatedPosX = barX;

    if (!!arrowStates.leftArrow && barX >= 0) {
        updatedPosX = barX -= 10;
    } else if (!!arrowStates.rightArrow && barX <= maxWidth - barWidth) {
        updatedPosX = barX += 10;
    }
    
    return updatedPosX;
}