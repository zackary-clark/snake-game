import { BOARD_SIZE } from "../../config";
import { calcNewPosition } from "../../helpers";
import { Food } from "../../pieces/Food";
import { Snake } from "../../pieces/Snake";
import { Direction } from "../../types/Direction";
import { AI } from "../ai";

export class Naive implements AI {
    constructor() {}

    public move(snake: Snake, food: Food): Direction {
        const snakeCoords: number[][] = [];
        const directionOptions: Direction[] = ["right", "up", "left", "down"];

        let i = 0;
        snake.traverseSnake((node) => {
            snakeCoords[i] = [node.x, node.y];
            i++;
        });

        const snakeHeadCoords = snakeCoords[0];
        const foodCoords = [food.x, food.y];

        directionOptions.sort((a, b) => {
            return this.calcNewDistance(snakeHeadCoords, foodCoords, a) -
                this.calcNewDistance(snakeHeadCoords, foodCoords, b);
        });
        directionOptions.sort((a, b) => {
            let ret = 0;
            if (this.checkForSnakeSelfCollision(snakeHeadCoords, snake, a) ||
                this.checkForWallCollision(snakeHeadCoords, a)) {
                    ret += 1;
            }
            if (this.checkForSnakeSelfCollision(snakeHeadCoords, snake, b) ||
                this.checkForWallCollision(snakeHeadCoords, b)) {
                    ret -= 1;
            }
            return ret;
        });
        return directionOptions[0];
    }

    private calcNewDistance(firstCoord: number[], secondCoord: number[], direction: Direction): number {
        const [oneX, oneY] = calcNewPosition(firstCoord[0], firstCoord[1], direction);
        const twoX = secondCoord[0];
        const twoY = secondCoord[1];
        return this.calcDistance(oneX, oneY, twoX, twoY);
    }

    private calcDistance(oneX: number, oneY: number, twoX: number, twoY: number): number {
        return Math.abs(oneX - twoX) + Math.abs(oneY - twoY);
    }

    private checkForSnakeSelfCollision(snakeHeadCoords: number[], snake: Snake, direction: Direction): boolean {
        const [newHeadX, newHeadY] = calcNewPosition(snakeHeadCoords[0], snakeHeadCoords[1], direction);
        let collided = false;
        snake.traverseSnake(node => {
            if (this.calcDistance(newHeadX, newHeadY, node.x, node.y) === 0) {
                collided = true;
                return true;
            }
        });
        return collided;
    }

    private checkForWallCollision(snakeHeadCoords: number[], direction: Direction): boolean {
        const [newHeadX, newHeadY] = calcNewPosition(snakeHeadCoords[0], snakeHeadCoords[1], direction);
        return newHeadX < 0 || newHeadX >= BOARD_SIZE || newHeadY < 0 || newHeadY >= BOARD_SIZE;
    }
}
