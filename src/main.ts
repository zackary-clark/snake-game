import { attachControls } from "./attachControls";
import { Board } from "./Board";
import { createCanvas, resizeCanvas } from "./canvas";
import { BOARD_SIZE, SNAKE_SPEED } from "./config";
import { Food } from "./pieces/Food";
import { Snake } from "./pieces/Snake";
import { Direction } from "./types/Direction";

const defaultFoodX = 3 * (BOARD_SIZE / 4);
const defaultFoodY = BOARD_SIZE / 2;

export function main() {
    const canvas = createCanvas();
    document.body.insertBefore(canvas, document.body.childNodes[0]);

    const board = new Board();
    let snake = new Snake();
    let food = new Food(defaultFoodX, defaultFoodY);
    let direction: Direction | null = null;

    const ticksBetweenMoves = 20 / SNAKE_SPEED;
    let ticksUntilMove = ticksBetweenMoves;

    function resetGame() {
        board.clear();
        snake = new Snake();
        food = new Food(defaultFoodX, defaultFoodY);
        direction = null;
    }

    attachControls((newDirection: Direction) => direction = newDirection, resetGame);

    function renderFrame() {
        board.clear();
        resizeCanvas();

        snake.traverseSnake((node) => {
            board.drawPiece(node);
        });
        board.drawPiece(food);
        board.renderFrame();
    }

    function eatFood() {
        food = new Food();
        snake.traverseSnake(node => {
            if (detectFoodHit(node.x, node.y)) {
                return eatFood();
            }
        });
    }

    function detectFoodHit(x: number, y: number): boolean {
        return food.x === x && food.y === y;
    }

    function eatFoodIfHit(newHeadX: number, newHeadY: number): boolean {
        const hit = detectFoodHit(newHeadX, newHeadY);
        if (hit) {
            eatFood();
        }
        return hit;
    }

    function tick() {
        ticksUntilMove--;
        if (ticksUntilMove <= 0) {
            ticksUntilMove = ticksBetweenMoves;
            snake.move(direction, eatFoodIfHit);
        }
        renderFrame();
    }

    setInterval(tick, 50);
}
