import { getContext } from "./getContext.js";

export function main() {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    document.body.insertBefore(canvas, document.body.childNodes[0]);

    const ctx = getContext();
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 80, 80);
}
