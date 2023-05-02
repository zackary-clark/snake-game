import { Board } from "./Board.js";
import { Food } from "./Food.js";
import { Snake } from "./Snake.js";

export const BOARD_SIZE = 20;
export const BORDER_SIZE = 2;

export function main() {
    const canvas = createCanvas();
    document.body.insertBefore(canvas, document.body.childNodes[0]);

    const board = new Board();
    const snake = new Snake();
    const food = new Food();

    function tick() {
        board.clear();
        resizeCanvas(canvas);

        snake.traverseSnake((node) => {
            board.drawPiece(node);
        });
        board.drawPiece(food);
        board.renderFrame(getPixelsPerSquare());
    }

    setInterval(tick, 50);
}

function createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    canvas.style.margin = "auto";
    canvas.style.display = "block";
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.bottom = "0";
    canvas.style.left = "0";
    canvas.style.right = "0";
    return canvas;
}

function resizeCanvas(canvas: HTMLCanvasElement) {
    canvas.width = getMaxCanvasSize();
    canvas.height = getMaxCanvasSize();
}

function getPixelsPerSquare(): number {
    const borderTotal = (BOARD_SIZE + 1) * BORDER_SIZE;
    return (getMaxCanvasSize() - borderTotal) / BOARD_SIZE;
}

function getMaxCanvasSize(): number {
    // TODO: Should this be memoized or based on browser events?
    // When improving the performance, benchmark it somehow
    return Math.min(window.innerHeight, window.innerWidth);
}
