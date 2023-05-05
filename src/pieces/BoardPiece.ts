import { BOARD_SIZE } from "../config.js";
import { ColorHexValue } from "../types/ColorHexValue.js";

export class BoardPiece {
    // @ts-ignore
    x: number;
    // @ts-ignore
    y: number;
    color: ColorHexValue;

    constructor(x = 0, y = 0, color: ColorHexValue = "#000000") {
        this.setLocation(x, y);
        this.color = color;
    }

    protected setLocation(x: number, y: number) {
        if (!this.checkLocation(x) || !this.checkLocation(y)) {
            throw new PointOutOfBoundsError(x, y);
        }
        this.x = x;
        this.y = y;
    }

    private checkLocation(value: number): boolean {
        return value >= 0 && value < BOARD_SIZE;
    }
}

export class PointOutOfBoundsError extends Error {
    constructor(x: number, y: number) {
        super(`Point ${x},${y} out of bounds - must be in ranges 0..${BOARD_SIZE}, 0..${BOARD_SIZE}`);
    }
}
