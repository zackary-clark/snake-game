import { getElementById } from "./helpers";

export function getCanvas(): HTMLCanvasElement {
    return getElementById("canvas");
}

export function getContext(): CanvasRenderingContext2D {
    const context = getCanvas().getContext("2d");
    if (!context) {
        throw new Error("No Context!");
    }
    return context;
}

export function resizeCanvas() {
    const canvasToScoreRatio = 4 / 5;
    const isHeightLimited = window.innerHeight < (canvasToScoreRatio * window.innerWidth);
    const containerHeight = isHeightLimited ? window.innerHeight : window.innerWidth * canvasToScoreRatio;
    const containerWidth = isHeightLimited ? window.innerHeight * (1 / canvasToScoreRatio) : window.innerWidth;

    const container = getElementById<HTMLDivElement>("container");
    container.style.width = `${containerWidth}px`;
    container.style.height = `${containerHeight}px`;

    const canvas = getCanvas();
    canvas.width = containerWidth * canvasToScoreRatio;
    canvas.height = containerHeight;

    const infoPanelContainer = getElementById<HTMLDivElement>("info-panel-container");
    infoPanelContainer.style.width = `${containerWidth * (1 - canvasToScoreRatio)}px`;
    infoPanelContainer.style.height = `${containerHeight}px`;
}
