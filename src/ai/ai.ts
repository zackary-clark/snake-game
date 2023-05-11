import { Food } from "../pieces/Food";
import { Snake } from "../pieces/Snake";
import { Direction } from "../types/Direction";
import { Dijkstra } from "./dijkstra/Dijkstra";
import { Naive } from "./naive/Naive";

export interface AI {
    type: aiType;
    move: (snake: Snake, food: Food) => Direction;
}

export type aiType = "human" | "naive" | "dijkstra";

export function aiFactory(type: aiType): AI | undefined {
    switch (type) {
        case "dijkstra":
            return new Dijkstra();
        case "naive":
            return new Naive();
        case "human":
        case undefined:
        default:
            return undefined;
    }
}
