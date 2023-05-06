import { BOARD_SIZE } from "../config";
import { Direction } from "../types/Direction";
import { BoardPiece } from "./BoardPiece";

const defaultX = BOARD_SIZE / 4;
const defaultY = BOARD_SIZE / 2;

export class Snake {
    private head: Node;
    private isAlive: boolean;

    constructor() {
        this.head = new Node(defaultX, defaultY);
        this.isAlive = true;
    }

    public traverseSnake(callback: (node: Node) => void) {
        let curr: Node | null = this.head;
        while (curr) {
            callback(curr)
            curr = curr.next;
        }
    }

    public move(direction: Direction | null) {
        if (!this.isAlive) return;
        switch (direction) {
            case "up":
                const upY = this.head.y - 1;
                if (upY < 0) {
                    this.die();
                    return;
                }
                this.head.setLocation(this.head.x, upY);
                break;
            case "down":
                const downY = this.head.y + 1;
                if (downY >= BOARD_SIZE) {
                    this.die();
                    return;
                }
                this.head.setLocation(this.head.x, downY);
                break;
            case "left":
                const leftX = this.head.x - 1;
                if (leftX < 0) {
                    this.die();
                    return;
                }
                this.head.setLocation(leftX, this.head.y);
                break;
            case "right":
                const rightX = this.head.x + 1;
                if (rightX >= BOARD_SIZE) {
                    this.die();
                    return;
                }
                this.head.setLocation(rightX, this.head.y);
                break;
        }
    }

    public reset() {
        this.isAlive = true;
        this.head = new Node(defaultX, defaultY);
    }

    public die() {
        this.isAlive = false;
        this.traverseSnake(node => {
            node.setColor("#C0C0C0");
        });
    }
}

class Node extends BoardPiece {
    next: Node | null;

    constructor(x?: number , y?: number) {
        super(x, y, "#35DE00");
        this.next = null;
    }
}
