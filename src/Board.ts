export class Board {

    private size: number;
    private borderSize: number;

    private x: number;
    private y: number;

    private filled: boolean[][];

    constructor(size: number, borderSize: number) {
        const board: boolean[][] = Array(size);
        for (let i = 0; i < size; i++) {
            board[i] = Array(size).fill(false);
        }
        this.filled = board;

        this.size = size;
        this.borderSize = borderSize;
        this.x = 0;
        this.y = 0;
    }

    public draw(context: CanvasRenderingContext2D, pixelsPerSquare: number) {
        this.x = 0;
        this.y = 0;
        this.drawHorizontalBorderLine(context, pixelsPerSquare);
        this.filled.forEach((row) => {
            this.drawVerticalBorderLine(context, pixelsPerSquare);
            row.forEach((squareFilled) => {
                this.drawSquare(context, pixelsPerSquare, squareFilled);
                this.drawVerticalBorderLine(context, pixelsPerSquare);
            });
            this.x = 0;
            this.y += pixelsPerSquare;
            this.drawHorizontalBorderLine(context, pixelsPerSquare);
        });
    }

    private drawSquare(context: CanvasRenderingContext2D, pixelsPerSquare: number, squareFilled: boolean) {
        context.fillStyle = squareFilled ? "blue" : "black";
        context.fillRect(this.x, this.y, pixelsPerSquare, pixelsPerSquare);
        this.x += pixelsPerSquare;
    }

    private drawVerticalBorderLine(context: CanvasRenderingContext2D, pixelsPerSquare: number) {
        context.fillStyle = "grey";
        context.fillRect(this.x, this.y, this.borderSize, pixelsPerSquare);
        this.x += this.borderSize;
    }

    private drawHorizontalBorderLine(context: CanvasRenderingContext2D, pixelsPerSquare: number) {
        const borderLength = this.borderSize + (this.size * pixelsPerSquare) + (this.size * this.borderSize);

        context.fillStyle = "grey";
        context.fillRect(this.x, this.y, borderLength, this.borderSize);
        this.y += this.borderSize;
    }
}
