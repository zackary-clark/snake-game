import { BOARD_SIZE } from "../../config";
import { calcNewPosition } from "../../helpers";
import { Food } from "../../pieces/Food";
import { Snake } from "../../pieces/Snake";
import { Direction } from "../../types/Direction";
import { AI, AIType } from "../ai";
import { buildCycle } from "./buildCycle";

export class ShortcutCycle implements AI {
    public type = AIType.shortcutCycle;

    private readonly cycle: number[][];

    constructor() {
        this.cycle = buildCycle();
    }

    move(snake: Snake, food?: Food): Direction {
        let direction: Direction = "right";
        const headWeight = this.cycle[snake.getHeadY()][snake.getHeadX()];
        let nextWeight = headWeight + 1;
        if (headWeight >= (BOARD_SIZE*BOARD_SIZE - 1)) nextWeight = 0;

        const directionOptions: Direction[] = ["right", "up", "left", "down"];
        directionOptions.forEach(dir => {
            const newPos = calcNewPosition(snake.getHeadX(), snake.getHeadY(), dir);
            if (!newPos.every(val => val < BOARD_SIZE && val >= 0)) return;

            if (this.cycle[newPos[1]][newPos[0]] === nextWeight) direction = dir;
        });

        return direction;
    }
}
