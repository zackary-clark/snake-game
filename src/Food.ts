import { BoardPiece } from "./BoardPiece.js";
import { ColorHexValue } from "./ColorHexValue.js";
import { BOARD_SIZE } from "./main.js";

export class Food extends BoardPiece {
    color: ColorHexValue;
    constructor() {
        super(3 * (BOARD_SIZE / 4), BOARD_SIZE / 2);
        this.color = "#FD0000"
    }
}
