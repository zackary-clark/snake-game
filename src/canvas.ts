export function getCanvas(): HTMLCanvasElement {
    const canvas = document.getElementById("canvas");
    if (!canvas) {
        throw new Error("No Canvas Found!");
    }
    return canvas as HTMLCanvasElement;
}

export function getContext(): CanvasRenderingContext2D {
    const context = getCanvas().getContext("2d");
    if (!context) {
        throw new Error("No Context!");
    }
    return context;
}

export function createCanvas(): HTMLCanvasElement {
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

export function resizeCanvas() {
    const canvas = getCanvas();
    const size = Math.min(window.innerHeight, window.innerWidth);
    canvas.width = size;
    canvas.height = size;
}
