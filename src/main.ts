import { Board } from "./Board.js";
import { Food } from "./Food.js";
import { getContext } from "./getContext.js";
import { Snake } from "./Snake.js";

export const BOARD_SIZE = 20;
export const BORDER_SIZE = 2;

export function main() {

    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    canvas.style.margin = "auto";
    canvas.style.display = "block";
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.bottom = "0";
    canvas.style.left = "0";
    canvas.style.right = "0";

    document.body.insertBefore(canvas, document.body.childNodes[0]);

    const board = new Board();
    const snake = new Snake();
    const food = new Food();

    setInterval(() => tick(canvas, board, snake, food), 50);
}

function tick(canvas: HTMLCanvasElement, board: Board, snake: Snake, food: Food) {
    board.clear();
    const sizeLimit = Math.min(window.innerHeight, window.innerWidth);

    canvas.width = sizeLimit;
    canvas.height = sizeLimit;

    const borderTotal = (BOARD_SIZE + 1) * BORDER_SIZE;
    const pixelsPerSquare = (sizeLimit - borderTotal) / BOARD_SIZE;

    snake.forEach((x, y) => {
        board.setColor(snake.color, x, y);
    });
    board.setColor(food.color, food.x, food.y);
    board.draw(getContext(), pixelsPerSquare);
}
