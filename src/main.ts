import { attachControls } from "./attachControls";
import { Board } from "./Board";
import { createCanvas, resizeCanvas } from "./canvas";
import { SNAKE_SPEED } from "./config";
import { Food } from "./pieces/Food";
import { Snake } from "./pieces/Snake";
import { Direction } from "./types/Direction";

export function main() {
    const canvas = createCanvas();
    document.body.insertBefore(canvas, document.body.childNodes[0]);

    const board = new Board();
    const snake = new Snake();
    const food = new Food();
    let direction: Direction | null = null;

    const ticksBetweenMoves = 20 / SNAKE_SPEED;
    let ticksUntilMove = ticksBetweenMoves;

    function resetGame() {
        board.clear();
        snake.reset();
        food.reset();
        direction = null;
    }

    attachControls((newDirection: Direction) => direction = newDirection, resetGame);

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
