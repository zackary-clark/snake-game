import { Board } from "./Board.js";
import { getContext } from "./getContext.js";

const BOARD_SIZE = 20;
const BORDER_SIZE = 2;

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

    const board = new Board(BOARD_SIZE, BORDER_SIZE);

    setInterval(() => tick(board, canvas), 50);
}

function tick(board: Board, canvas: HTMLCanvasElement) {
    const sizeLimit = Math.min(window.innerHeight, window.innerWidth);

    canvas.width = sizeLimit;
    canvas.height = sizeLimit;

    const borderTotal = (BOARD_SIZE + 1) * BORDER_SIZE;
    const pixelsPerSquare = (sizeLimit - borderTotal) / BOARD_SIZE;

    board.draw(getContext(), pixelsPerSquare);
}
