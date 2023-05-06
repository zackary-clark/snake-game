import { BOARD_SIZE } from "./config";

export function randomCoord(): number {
    return Math.floor(Math.random() * BOARD_SIZE);
}
