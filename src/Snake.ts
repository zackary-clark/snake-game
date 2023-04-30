import { BoardPiece } from "./BoardPiece.js";
import { ColorHexValue } from "./ColorHexValue.js";
import { BOARD_SIZE } from "./main.js";

export class Snake {
    color: ColorHexValue;
    private head: Node;

    constructor() {
        this.head = new Node(BOARD_SIZE / 4, BOARD_SIZE / 2);
        this.color = "#35DE00";
    }

    public forEach(callback: (x: number, y: number) => void) {
        let curr: Node | null = this.head;
        while (curr) {
            callback(curr.x, curr.y)
            curr = curr.next;
        }
    }
}

class Node extends BoardPiece {
    next: Node | null;

    constructor(x?: number , y?: number) {
        super(x, y);
        this.next = null;
    }
}
