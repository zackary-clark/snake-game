import { BOARD_SIZE } from "../config.js";
import { BoardPiece } from "./BoardPiece.js";

const defaultX = 3 * (BOARD_SIZE / 4);
const defaultY = BOARD_SIZE / 2;

export class Food extends BoardPiece {
    constructor() {
        super(defaultX, defaultY, "#FD0000");
    }

    reset() {
        this.setLocation(defaultX, defaultY);
    }
}
