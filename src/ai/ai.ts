import { Food } from "../pieces/Food";
import { Snake } from "../pieces/Snake";
import { Direction } from "../types/Direction";
import { Naive } from "./naive/Naive";

export interface AI {
    type: aiType;
    move: (snake: Snake, food: Food) => Direction;
}

export type aiType = "human" | "naive";

export function aiFactory(type: aiType): AI | undefined {
    switch (type) {
        case "naive":
            return new Naive();
        case "human":
        case undefined:
        default:
            return undefined;
    }
}
