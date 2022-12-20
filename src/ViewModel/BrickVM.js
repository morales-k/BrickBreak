const brickRows = 3;
const brickCols = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickLayoutWidth = brickCols * (brickWidth + brickPadding);
const brickLayoutOrigin = (window.innerWidth / 2) - (brickLayoutWidth / 2);
const brickOffsetLeft = brickLayoutOrigin;
const brickOffsetTop = 50;
const bricks = [];
export let remainingBricks = brickRows * brickCols;

/**
 * Creates a 2D array of bricks, with X rows containing X columns.
 * 
 */
export const createBrickArray = () => {
    for (let c = 0; c < brickCols; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRows; r++) {
            bricks[c][r] = { x: 0, y: 0, destroyed: 1 };
        }
    }
    remainingBricks = brickRows * brickCols;
}

/**
 * Gives each item in the bricks array updated origin coords & draws the bricks.
 * 
 * @param {object} ctx - The context of the canvas object.
 */
export const drawBrickField = (ctx) => {
    for (let c = 0; c < brickCols; c++) {
        for (let r = 0; r < brickRows; r++) {
            if (bricks[c][r].destroyed === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#C45E5A";
                ctx.fill();
                ctx.strokeStyle = '#8C4341';
                ctx.lineWidth = 1.5;
                ctx.lineJoin = "round";
                ctx.stroke();
            }
        }
    }
};

/**
 * Determines if ball collides with a brick. If so, sets
 * the brick's destroyed status to 0 & reverses ball direction.
 * 
 * @param {object} ball - {x, y, dx, dy, radius}
 * @returns boolean
 */
export const detectBrickCollision = (ball) => {
    for (let c = 0; c < brickCols; c++) {
        for (let r = 0; r < brickRows; r++) {
        const currentBrick = bricks[c][r];
        const width = currentBrick.x + brickWidth;
        const height = currentBrick.y + brickHeight;

            if (currentBrick.destroyed === 1 &&
                ball.x >= currentBrick.x && 
                ball.x <= width &&
                ball.y >= currentBrick.y && 
                ball.y <= height) {
                ball.dy = -ball.dy;
                currentBrick.destroyed = 0;
                remainingBricks--;
                return true;
            }
        }
    }
    return false;
};