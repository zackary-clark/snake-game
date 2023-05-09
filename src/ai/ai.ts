import { Food } from "../pieces/Food";
import { Snake } from "../pieces/Snake";
import { Direction } from "../types/Direction";

export interface AI {
    move: (snake: Snake, food: Food) => Direction;
}
