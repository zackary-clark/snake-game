import { Board } from "./Board.js";
import { getContext } from "./getContext.js";

export function main() {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    document.body.insertBefore(canvas, document.body.childNodes[0]);

    const board = new Board(12, 64, 2);
    board.draw(getContext());
}
