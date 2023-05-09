import { BOARD_SIZE } from "../config";
import { calcNewPosition } from "../helpers";
import { Direction } from "../types/Direction";
import { BoardPiece } from "./BoardPiece";

const defaultX = BOARD_SIZE / 4;
const defaultY = BOARD_SIZE / 2;

export class Snake {
    private readonly head: Node;
    public isAlive: boolean;

    constructor() {
        this.head = new Node(defaultX, defaultY);
        this.isAlive = true;
    }

    /*
    * Callback return value is used to short circuit.
    * Returning true will immediately end the traversal.
    * */
    public traverseSnake(callback: (node: Node) => boolean | void) {
        let curr: Node | null = this.head;
        while (curr) {
            if (callback(curr)) return;
            curr = curr.next;
        }
    }

    public move(direction: Direction | null, detectFoodHit: (newHeadX: number, newHeadY: number) => boolean) {
        if (!this.isAlive || !direction) return;
        let shouldGrow = false;
        const [newX, newY] = calcNewPosition(this.head, direction);

        if (this.detectWallHit(newX, newY) || this.detectSelfHit(newX, newY)) {
            this.die();
            return;
        }
        shouldGrow = detectFoodHit(newX, newY);

        this.relocateNodes(newX, newY, shouldGrow);
    }

    public die() {
        this.isAlive = false;
        this.traverseSnake(node => {
            node.setColor("#C0C0C0");
        });
    }

    private relocateNodes(newX: number, newY: number, shouldGrow: boolean) {
        let node: Node | null = this.head;
        let prev: Node | null = null;
        let x = newX;
        let y = newY;
        while (node) {
            const prevX = node.x;
            const prevY = node.y;
            node.setLocation(x, y);
            x = prevX;
            y = prevY
            prev = node;
            node = node.next;
        }
        if (shouldGrow && prev) {
            prev.next = new Node(x, y);
        }
    }

    private detectWallHit(newX: number, newY: number): boolean {
        return newX < 0 || newX >= BOARD_SIZE || newY < 0 || newY >= BOARD_SIZE;
    }

    private detectSelfHit(newX: number, newY: number): boolean {
        let hit = false;
        this.traverseSnake(node => {
            if (node.x === newX && node.y === newY) {
                hit = true;
                return true;
            }
        });
        return hit;
    }
}

class Node extends BoardPiece {
    next: Node | null;

    constructor(x?: number , y?: number) {
        super(x, y, "#35DE00");
        this.next = null;
    }
}
