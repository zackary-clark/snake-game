import { randomCoord } from "../helpers";
import { BoardPiece } from "./BoardPiece";

export class Food extends BoardPiece {
    constructor(defaultX?: number, defaultY?: number) {
        super(defaultX || randomCoord(), defaultY || randomCoord(), "#FD0000");
    }
}
