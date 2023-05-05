import { BOARD_SIZE } from "../config.js";
import { Direction } from "../types/Direction.js";
import { BoardPiece } from "./BoardPiece.js";

const defaultX = BOARD_SIZE / 4;
const defaultY = BOARD_SIZE / 2;

export class Snake {
    private head: Node;

    constructor() {
        this.head = new Node(defaultX, defaultY);
    }

    public traverseSnake(callback: (node: Node) => void) {
        let curr: Node | null = this.head;
        while (curr) {
            callback(curr)
            curr = curr.next;
        }
    }

    public move(direction: Direction | null) {
        switch (direction) {
            case "up":
                this.head.moveUp();
                break;
            case "down":
                this.head.moveDown();
                break;
            case "left":
                this.head.moveLeft();
                break;
            case "right":
                this.head.moveRight();
                break;
        }
    }

    public reset() {
        this.head = new Node(defaultX, defaultY);
    }
}

class Node extends BoardPiece {
    next: Node | null;

    constructor(x?: number , y?: number) {
        super(x, y, "#35DE00");
        this.next = null;
    }

    moveUp() {
        this.setLocation(this.x, this.y - 1);
    }

    moveDown() {
        this.setLocation(this.x, this.y + 1);
    }

    moveLeft() {
        this.setLocation(this.x - 1, this.y);
    }

    moveRight() {
        this.setLocation(this.x + 1, this.y);
    }
}
