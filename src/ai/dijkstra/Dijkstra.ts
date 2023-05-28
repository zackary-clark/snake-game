import { BOARD_SIZE } from "../../config";
import { Food } from "../../pieces/Food";
import { Snake } from "../../pieces/Snake";
import { Direction } from "../../types/Direction";
import { AI, AIType } from "../ai";
import { Naive } from "../naive/Naive";

export class Dijkstra implements AI {
    public type: AIType = AIType.dijkstra;

    // @ts-ignore
    private target: Node | null;
    private shortestPath: Direction[];
    private naiveBackup: Naive;

    constructor() {
        this.shortestPath = [];
        this.naiveBackup = new Naive();
    }

    public move(snake: Snake, food: Food | undefined): Direction {
        if (!food) return this.naiveBackup.move(snake, food);
        if (this.target && this.target.matches(food.x, food.y) && this.shortestPath.length > 0) return this.shortestPath.shift() as Direction;
        this.target = new Node(food.x, food.y);
        let head: Node;
        const snakeParts: Node[] = [];
        snake.traverseSnake((node) => {
            if (!head) head = new Node(node.x, node.y);
            snakeParts.push(new Node(node.x, node.y));
        });
        // @ts-ignore
        this.shortestPath = this.findShortestPath(head, this.target, snakeParts);
        return this.shortestPath.shift() ?? this.naiveBackup.move(snake, food);
    }

    private findShortestPath(start: Node, target: Node, snakeParts: Node[]): Direction[] {
        const visited: boolean[][] = Array(BOARD_SIZE);
        const dist: (number | null)[][] = Array(BOARD_SIZE);
        const prev: (Node | null)[][] = Array(BOARD_SIZE);
        for (let i = 0; i < BOARD_SIZE; i++) {
            visited[i] = Array(BOARD_SIZE).fill(false);
            dist[i] = Array(BOARD_SIZE).fill(null);
            prev[i] = Array(BOARD_SIZE).fill(null);
        }
        dist[start.y][start.x] = 0;

        const stack: Node[] = [new Node(start.x, start.y)];
        while (stack.length > 0) {
            const curr = stack.pop() as Node;
            const {x, y} = curr;

            visited[y][x] = true;
            const currDist = dist[y][x] as number;

            const directions: Direction[] = ["right", "left", "up", "down"];
            directions.forEach((direction) => {
                const candidate = curr.calcNewPosition(direction);
                if (!candidate.checkLocation() || snakeParts.some(el => el.matches(candidate)) || visited[candidate.y][candidate.x]) return;

                const candDist = dist[candidate.y][candidate.x];

                if (candDist === null || currDist < candDist) {
                    dist[candidate.y][candidate.x] = (currDist ?? 0) + 1;
                    prev[candidate.y][candidate.x] = curr;
                }

                stack.push(candidate);
            });
        }

        return this.backtrackPath(prev, target);
    }

    private backtrackPath(prev: (Node | null)[][], target: Node): Direction[] {
        const path: Direction[] = [];
        let curr: Node | null = target;
        let p: Node | null;
        while (curr !== null) {
            p = prev[curr.y][curr.x];
            if (p) path.unshift(curr.calcDirection(p));
            curr = p;
        }
        return path;
    }
}

class Node {
    public x: number;
    public y: number;

    constructor(position: number[]);
    constructor(x: number, y: number);
    constructor(arg0: number[] | number, arg1?: number) {
        let x: number, y: number;
        if (typeof arg0 === "number") {
            x = arg0;
            y = arg1 as number;
        } else {
            x = arg0[0];
            y = arg0[1];
        }
        this.x = x;
        this.y = y;
    }

    public matches(node: Node): boolean;
    public matches(x: number, y: number): boolean;
    public matches(arg0: Node | number, y?: number): boolean {
        if (typeof arg0 === "number") {
            return this.x === arg0 && this.y === y;
        } else {
            return this.x === arg0.x && this.y === arg0.y;
        }
    }

    public calcDirection(from: Node): Direction {
        if (this.matches(from)) throw new Error("Nodes cannot match");

        const diffX = from.x - this.x;
        const diffY = from.y - this.y;

        if (diffX !== 0 && diffY !== 0) throw new Error("Nodes must be adjacent");

        if (diffX === -1) return "right";
        if (diffX === 1) return "left";
        if (diffY === -1) return "down";
        return "up";
    }

    public calcNewPosition(direction: Direction): Node {
        let newX = this.x;
        let newY = this.y;

        switch (direction) {
            case "up":
                newY = newY - 1;
                break;
            case "down":
                newY = newY + 1;
                break;
            case "left":
                newX = newX - 1;
                break;
            case "right":
                newX = newX + 1;
                break;
        }

        return new Node(newX, newY);
    }

    public checkLocation(): boolean {
        return (this.x >= 0 && this.x < BOARD_SIZE) && (this.y >= 0 && this.y < BOARD_SIZE);
    }
}
