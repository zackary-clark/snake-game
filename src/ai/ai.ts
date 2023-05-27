import { Food } from "../pieces/Food";
import { Snake } from "../pieces/Snake";
import { Direction } from "../types/Direction";
import { Dijkstra } from "./dijkstra/Dijkstra";
import { Naive } from "./naive/Naive";

export interface AI {
    type: AIType;
    move: (snake: Snake, food: Food) => Direction;
}

export enum AIType {
    human = "human",
    naive = "naive",
    dijkstra = "dijkstra",
}

export function createAI(type: AIType): AI | undefined {
    switch (type) {
        case AIType.dijkstra:
            return new Dijkstra();
        case AIType.naive:
            return new Naive();
        case AIType.human:
        case undefined:
        default:
            return undefined;
    }
}
