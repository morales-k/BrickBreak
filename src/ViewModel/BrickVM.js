import { effectVolume, playEffect } from "./SoundVM";
export let brickLayout = {
    rows: 3,
    cols: 5,
    bricks: [],
};

/**
 * Creates a 2D array of bricks, based on brickLayout and level.
 * @param {object} brickLayout - Contains brick rows, columns and bricks array.
 * @param {Number} level - Current game level.
 * 
 */
export const createBrickArray = (brickLayout, level) => {
    let allSkippedBricks = 0;

    for (let c = 0; c < brickLayout.cols; c++) {
        brickLayout.bricks[c] = [];
        for (let r = 0; r < brickLayout.rows; r++) {
            let skipBrick = brickShouldBeSkipped(level, r, c);
            let strong = brickShouldBeStrong(level, r, c);

            brickLayout.bricks[c][r] = { 
                x: 0, 
                y: 0, 
                destroyed: skipBrick ? 0 : strong ? 2 : 1, 
                strong: strong, 
                skipBrick: skipBrick 
            };
            
            if (skipBrick) {
                allSkippedBricks++;
            }
        }

        // Add remaining brick count.
        brickLayout.remainingBricks = (brickLayout.bricks.length * brickLayout.bricks[c].length) - allSkippedBricks;
    }
}

/**
 * Determines if a brick should be skipped based on level & brickLayout.
 * 
 * @param {Number} level - The current game level.
 * @param {Number} r - The current [r] value for brickLayouts.bricks.
 * @param {Number} c - The current [c] value for brickLayouts.bricks.
 * @returns boolean
 */
function brickShouldBeSkipped(level, r, c) {
    let skip = false;

    if (level === 1) {
        // Skip each even brick in the 2nd row.
        if ((r === 2) && (c % 2 === 0)) {
            skip = true;
        }
    } else if (level === 2) {
        // Skip row 2, cols 1 & 3.
        if ((r === 2) && (c === 1 || c === 3)) {
            skip = true;
        }
    } else if (level === 3) {
        // Skip first & last brick in even columns.
        if ((r === 2) && (c === 2) ||
            (r % 2 !== 0) && (c === 0 || c === 4)) {
            skip = true;
        }
    }

    return skip;
}

function brickShouldBeStrong(level, r, c) {
    let strong = false;

    if (level === 2) {
        // Each odd brick in the 2nd, and even brick in the 4th row is strong.
        if ((r === 1) && (c % 2 === 0) ||
            (r === 3) && (c % 2 !== 0)) {
            strong = true;
        }
    } else if (level === 3) {
        // Each even column brick in an even row is strong.
        if ((r % 2 !== 0) && (c % 2 !== 0)) {
            strong = true;
        }
    }

    return strong;
}

/**
 * Gives each item in the bricks array updated origin coords & draws the bricks.
 * 
 * @param {object} ctx - The context of the canvas object.
 * @param {Number} canvasWidth - Width of canvas bounding rect. (Not multiplied by dpr).
 * @param {Number} brickWidth - Width of each brick, based on a % of canvas size.
 * @param {Number} brickHeight - Height of each brick, based on a % of brickWidth.
 * @param {object} layout - The brickLayout object.
 */
export const drawBrickField = (ctx, canvasWidth, brickWidth, brickHeight, layout) => {
    const brickPadding = 8;
    const brickOffsetTop = 60;
    const brickLayoutWidth = layout.cols * (brickWidth + brickPadding);
    const brickOffsetLeft = ((canvasWidth - brickLayoutWidth) / 2) + 4;

    for (let c = 0; c < layout.cols; c++) {
        for (let r = 0; r < layout.rows; r++) {
            if (layout.bricks[c][r].destroyed > 0) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                const strongBrick = layout.bricks[c][r].strong;
                layout.bricks[c][r].x = brickX;
                layout.bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = strongBrick ? "#A6A6A6" : "#C45E5A";
                ctx.fill();
                ctx.strokeStyle = strongBrick ? "#737373" : "#8C4341";
                ctx.lineWidth = 1.5;
                ctx.lineJoin = "round";
                ctx.stroke();
            }
        }
    }
};

/**
 * Determines if ball collides with a brick. If so, decrements
 * the brick's destroyed status & reverses ball direction.
 * Returns true if a brick is destroyed.
 * 
 * @param {object} ball - {x, y, dx, dy, radius}
 * @param {Number} brickWidth - Width of each brick, based on a % of canvas size.
 * @param {Number} brickHeight - Height of each brick, based on a % of brickWidth.
 * @returns boolean
 */
export const detectBrickCollision = (ball, brickWidth, brickHeight) => {
    for (let c = 0; c < brickLayout.cols; c++) {
        for (let r = 0; r < brickLayout.rows; r++) {
        const currentBrick = brickLayout.bricks[c][r];
        const width = currentBrick.x + brickWidth;
        const height = currentBrick.y + brickHeight;

            if (currentBrick.destroyed > 0 &&
                ball.x + ball.radius >= currentBrick.x && 
                ball.x - ball.radius <= width &&
                ball.y + ball.radius >= currentBrick.y && 
                ball.y - ball.radius <= height) {
                playEffect(effectVolume, 'pop');
                ball.dy = -ball.dy;
                currentBrick.destroyed--;
                if (currentBrick.destroyed === 0) {
                    brickLayout.remainingBricks--;
                    return true;
                }
            }
        }
    }
    return false;
};