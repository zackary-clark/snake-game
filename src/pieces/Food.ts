import { BOARD_SIZE } from "../config";
import { BoardPiece } from "./BoardPiece";

const defaultX = 3 * (BOARD_SIZE / 4);
const defaultY = BOARD_SIZE / 2;

export class Food extends BoardPiece {
    constructor() {
        super(defaultX, defaultY, "#FD0000");
    }

    reset() {
        this.setLocation(defaultX, defaultY);
    }

    eat() {
        // TODO: this should ensure we don't "spawn" food on top of the snake
        const x = Food.randomCoord();
        const y = Food.randomCoord();
        this.setLocation(x, y)
    }

    private static randomCoord(): number {
        return Math.floor(Math.random() * BOARD_SIZE)
    }
}
