import { BOARD_SIZE } from "../../config";
import { Snake } from "../../pieces/Snake";
import { Direction } from "../../types/Direction";
import { AI, AIType } from "../ai";

export class HamiltonianCycle implements AI {
    public type = AIType.hamiltonianCycle;

    private cycle: Direction[][];

    constructor() {
        this.cycle = this.buildCycle();
    }

    move(snake: Snake): Direction {
        return this.cycle[snake.getHeadY()][snake.getHeadX()];
    }

    private buildCycle(): Direction[][] {
        const board: Direction[][] = [];

        board[0] = this.firstRow();
        for (let i = 1; i < BOARD_SIZE - 1; i++) {
            board[i] = i % 2 === 0 ? this.evenRow() : this.oddRow();
        }
        board[BOARD_SIZE - 1] = this.lastRow();

        return board;
    }

    private firstRow(): Direction[] {
        const row: Direction[] = [];

        for (let i = 0; i < BOARD_SIZE - 1; i++) {
            row[i] = "right";
        }
        row.push("down");

        return row;
    }

    private oddRow(): Direction[] {
        const row: Direction[] = [];

        row.push("up");
        row.push("down")
        for (let i = 2; i < BOARD_SIZE; i++) {
            row[i] = "left";
        }

        return row;
    }

    private evenRow(): Direction[] {
        const row: Direction[] = [];

        row.push("up");
        for (let i = 1; i < BOARD_SIZE - 1; i++) {
            row[i] = "right";
        }
        row.push("down");

        return row;
    }

    private lastRow(): Direction[] {
        const row: Direction[] = [];

        row.push("up");
        for (let i = 1; i < BOARD_SIZE; i++) {
            row[i] = "left";
        }

        return row;
    }
}
