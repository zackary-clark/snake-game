import { BoardPiece } from "./BoardPiece.js";
import { BOARD_SIZE } from "./main.js";

export class Food extends BoardPiece {
    constructor() {
        super(3 * (BOARD_SIZE / 4), BOARD_SIZE / 2, "#FD0000");
    }
}
