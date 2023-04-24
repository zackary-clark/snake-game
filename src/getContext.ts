function getCanvas(): HTMLCanvasElement {
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
