import { attachControls } from "./attachControls.js";
import { Board } from "./Board.js";
import { createCanvas, resizeCanvas } from "./canvas.js";
import { Food } from "./pieces/Food.js";
import { Snake } from "./pieces/Snake.js";
import { Direction } from "./types/Direction.js";

export const BOARD_SIZE: number = 20;
export const BORDER_SIZE: number = 2;
export const SNAKE_SPEED: number = 10;

export function main() {
    const canvas = createCanvas();
    document.body.insertBefore(canvas, document.body.childNodes[0]);

    const board = new Board();
    const snake = new Snake();
    const food = new Food();
    let direction: Direction | null = null;
    const ticksBetweenMoves = 20 / SNAKE_SPEED;
    let ticksUntilMove = ticksBetweenMoves;

    attachControls((newDirection: Direction) => direction = newDirection);

    function registerMoves() {
        ticksUntilMove--;
        if (ticksUntilMove <= 0) {
            ticksUntilMove = ticksBetweenMoves;
            snake.move(direction);
        }
    }

    function renderFrame() {
        board.clear();
        resizeCanvas();

        snake.traverseSnake((node) => {
            board.drawPiece(node);
        });
        board.drawPiece(food);
        board.renderFrame();
    }

    function tick() {
        registerMoves();
        renderFrame();
    }

    setInterval(tick, 50);
}
