import { ColorHexValue } from "./ColorHexValue.js";
import { BOARD_SIZE, BORDER_SIZE } from "./main.js";

export class Board {
    private borderColor: ColorHexValue;
    private unfilledSquareColor: ColorHexValue;

    private x: number;
    private y: number;

    private board: ColorHexValue[][];

    constructor() {
        this.borderColor = "#000066";
        this.unfilledSquareColor = "#000000";

        const board: ColorHexValue[][] = Array(BOARD_SIZE);
        for (let i = 0; i < BOARD_SIZE; i++) {
            board[i] = Array(BOARD_SIZE).fill(this.unfilledSquareColor);
        }
        this.board = board;

        this.x = 0;
        this.y = 0;
    }

    public clear() {
        for (let i = 0; i < this.board.length; i++) {
            const row = this.board[i];
            for (let j = 0; j < row.length; j++) {
                row[j] = this.unfilledSquareColor;
            }
        }
    }

    public draw(context: CanvasRenderingContext2D, pixelsPerSquare: number) {
        this.x = 0;
        this.y = 0;
        this.drawHorizontalBorderLine(context, pixelsPerSquare);
        this.board.forEach((row) => {
            this.drawVerticalBorderLine(context, pixelsPerSquare);
            row.forEach((color) => {
                this.drawSquare(context, pixelsPerSquare, color);
                this.drawVerticalBorderLine(context, pixelsPerSquare);
            });
            this.x = 0;
            this.y += pixelsPerSquare;
            this.drawHorizontalBorderLine(context, pixelsPerSquare);
        });
    }

    public setColor(color: ColorHexValue, x: number, y: number) {
        this.board[y][x] = color;
    }

    private drawSquare(context: CanvasRenderingContext2D, pixelsPerSquare: number, color: ColorHexValue) {
        context.fillStyle = color;
        context.fillRect(this.x, this.y, pixelsPerSquare, pixelsPerSquare);
        this.x += pixelsPerSquare;
    }

    private drawVerticalBorderLine(context: CanvasRenderingContext2D, pixelsPerSquare: number) {
        context.fillStyle = this.borderColor;
        context.fillRect(this.x, this.y, BORDER_SIZE, pixelsPerSquare);
        this.x += BORDER_SIZE;
    }

    private drawHorizontalBorderLine(context: CanvasRenderingContext2D, pixelsPerSquare: number) {
        const borderLength = BORDER_SIZE + (BOARD_SIZE * pixelsPerSquare) + (BOARD_SIZE * BORDER_SIZE);
        context.fillStyle = this.borderColor;
        context.fillRect(this.x, this.y, borderLength, BORDER_SIZE);
        this.y += BORDER_SIZE;
    }
}
