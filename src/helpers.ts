import { BOARD_SIZE } from "./config";
import { BoardPiece } from "./pieces/BoardPiece";
import { ColorHexValue } from "./types/ColorHexValue";
import { Direction } from "./types/Direction";

export function randomCoord(): number {
    return Math.floor(Math.random() * BOARD_SIZE);
}

export function getElementById<T = HTMLDivElement>(id: string): T {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`${id} Not Found!`);
    }
    return element as T;
}

export function getCSSVar(varName: string): ColorHexValue {
    return <`#${string}`>getComputedStyle(document.documentElement).getPropertyValue(`--${varName}`);
}

export function calcNewPosition(piece: BoardPiece, direction: Direction): number[];
export function calcNewPosition(x: number, y: number, direction: Direction): number[]
export function calcNewPosition(arg0: number | BoardPiece, arg1: number | Direction, arg2?: Direction): number[] {
    let piece, direction, x, y;
    if (!arg2) {
        piece = arg0 as BoardPiece;
        direction = arg1 as Direction;
    } else {
        x = arg0 as number;
        y = arg1 as number;
        direction = arg2 as Direction;
    }

    let newX = piece?.x ?? x ?? 0;
    let newY = piece?.y ?? y ?? 0;

    switch (direction) {
        case "up":
            newY = newY - 1;
            break;
        case "down":
            newY = newY + 1;
            break;
        case "left":
            newX = newX - 1;
            break;
        case "right":
            newX = newX + 1;
            break;
    }

    return [newX, newY];
}
