export class Board {

    private size: number;
    private pixelsPerSquare: number;
    private borderSize: number;

    private x: number;
    private y: number;

    private filled: boolean[][];

    constructor(size: number, pixelsPerSquare: number, borderSize: number) {
        const board: boolean[][] = Array(size);
        for (let i = 0; i < size; i++) {
            board[i] = Array(size).fill(false);
        }
        this.filled = board;

        this.size = size;
        this.pixelsPerSquare = pixelsPerSquare;
        this.borderSize = borderSize;
        this.x = 0;
        this.y = 0;
    }

    public draw(context: CanvasRenderingContext2D) {
        this.x = 0;
        this.y = 0;
        this.drawHorizontalBorderLine(context);
        this.filled.forEach((row) => {
            this.drawVerticalBorderLine(context);
            row.forEach((squareFilled) => {
                this.drawSquare(context, squareFilled);
                this.drawVerticalBorderLine(context);
            });
            this.x = 0;
            this.y += this.pixelsPerSquare;
            this.drawHorizontalBorderLine(context);
        });
    }

    private drawSquare(context: CanvasRenderingContext2D, squareFilled: boolean) {
        context.fillStyle = squareFilled ? "blue" : "black";
        context.fillRect(this.x, this.y, this.pixelsPerSquare, this.pixelsPerSquare);
        this.x += this.pixelsPerSquare;
    }

    private drawVerticalBorderLine(context: CanvasRenderingContext2D) {
        context.fillStyle = "grey";
        context.fillRect(this.x, this.y, this.borderSize, this.pixelsPerSquare);
        this.x += this.borderSize;
    }

    private drawHorizontalBorderLine(context: CanvasRenderingContext2D) {
        const borderLength = this.borderSize + (this.size * this.pixelsPerSquare) + (this.size * this.borderSize);

        context.fillStyle = "grey";
        context.fillRect(this.x, this.y, borderLength, this.borderSize);
        this.y += this.borderSize;
    }
}
