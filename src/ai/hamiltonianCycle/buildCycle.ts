import { BOARD_SIZE } from "../../config";

export function buildCycle(): number[][] {
    const board: number[][] = [];
    let order = 0;

    for (let i = 0; i < BOARD_SIZE; i++) {
        board[i] = [];
        board[0][i] = order++;
    }
    for (let i = 1; i < BOARD_SIZE; i++) {
        if (i % 2 === 0) {
            for (let j = 1; j < BOARD_SIZE; j++) {
                board[i][j] = order++;
            }
        } else {
            for (let j = BOARD_SIZE - 1; j > 0; j--) {
                board[i][j] = order++;
            }
        }
    }
    for (let i = BOARD_SIZE - 1; i > 0; i--) {
        board[i][0] = order++;
    }

    return board;
}
