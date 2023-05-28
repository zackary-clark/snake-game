import { Food } from "../pieces/Food";
import { Snake } from "../pieces/Snake";
import { Direction } from "../types/Direction";
import { Dijkstra } from "./dijkstra/Dijkstra";
import { HamiltonianCycle } from "./hamiltonianCycle/HamiltonianCycle";
import { Naive } from "./naive/Naive";

export interface AI {
    type: AIType;
    move: (snake: Snake, food: Food | undefined) => Direction;
}

export enum AIType {
    human = "human",
    naive = "naive",
    dijkstra = "dijkstra",
    hamiltonianCycle = "hamiltonianCycle",
}

export function createAI(type: AIType): AI | undefined {
    switch (type) {
        case AIType.hamiltonianCycle:
            return new HamiltonianCycle();
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
