import { BOARD_SIZE } from "./config";

export function randomCoord(): number {
    return Math.floor(Math.random() * BOARD_SIZE);
}

export function getElementById<T>(id: string): T {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`${id} Not Found!`);
    }
    return element as T;
}
