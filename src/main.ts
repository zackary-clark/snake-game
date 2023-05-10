import { Naive } from "./ai/naive/Naive";
import { attachControls } from "./attachControls";
import { Board } from "./Board";
import { resizeCanvas } from "./canvas";
import { BOARD_SIZE, BORDER_COLOR, BORDER_SIZE, SNAKE_SPEED, TICKS_PER_SECOND } from "./config";
import { getElementById } from "./helpers";
import { HighScore } from "./HighScore";
import { Food } from "./pieces/Food";
import { Snake } from "./pieces/Snake";
import { Direction } from "./types/Direction";

const defaultFoodX = 3 * (BOARD_SIZE / 4);
const defaultFoodY = BOARD_SIZE / 2;

export function main() {
    const infoPanel = getElementById<HTMLDivElement>("info-panel");
    const borderStyle = `${BORDER_SIZE}px solid ${BORDER_COLOR}`;
    infoPanel.style.borderTop = borderStyle;
    infoPanel.style.borderBottom = borderStyle;
    infoPanel.style.borderRight = borderStyle;
    infoPanel.style.height = `calc(100% - ${BORDER_SIZE * 2}px)`;

    const board = new Board();
    let snake = new Snake();
    let food = new Food(defaultFoodX, defaultFoodY);

    const ai = new Naive();
    let aiMode = false;
    let direction: Direction | null = null;

    let score = 0;
    const humanHighScore = new HighScore("human");
    const naiveHighScore = new HighScore("naive");

    const ticksBetweenMoves = Math.round(TICKS_PER_SECOND / SNAKE_SPEED);
    let ticksUntilMove = ticksBetweenMoves;

    function resetGame() {
        board.clear();
        snake = new Snake();
        food = new Food(defaultFoodX, defaultFoodY);
        direction = null;
        score = 0;
    }

    attachControls({
        setDirection: (newDirection: Direction) => {
            if (!aiMode) {
                direction = newDirection
            }
        },
        resetGame: resetGame,
        toggleAIMode: () => aiMode = !aiMode,
    });

    function renderFrame() {
        board.clear();
        resizeCanvas();

        const scoreElement = getElementById<HTMLParagraphElement>("score");
        scoreElement.textContent = score.toString();

        humanHighScore.renderScores();
        naiveHighScore.renderScores();

        snake.traverseSnake((node) => {
            board.drawPiece(node);
        });
        board.drawPiece(food);
        board.renderFrame();
    }

    function eatFood(newHeadX: number, newHeadY: number): void {
        food = new Food();
        if (detectFoodHit(newHeadX, newHeadY)) return eatFood(newHeadX, newHeadY);
        snake.traverseSnake(node => {
            if (detectFoodHit(node.x, node.y)) return eatFood(newHeadX, newHeadY);
        });
    }

    function detectFoodHit(x: number, y: number): boolean {
        return food.x === x && food.y === y;
    }

    function eatFoodIfHit(newHeadX: number, newHeadY: number): boolean {
        const hit = detectFoodHit(newHeadX, newHeadY);
        if (hit) {
            score++;
            eatFood(newHeadX, newHeadY);
        }
        return hit;
    }

    function endGame() {
        if (!aiMode) humanHighScore.addNewScore(score);
        else naiveHighScore.addNewScore(score);
    }

    function tick() {
        ticksUntilMove--;
        if (snake.isAlive && ticksUntilMove <= 0) {
            ticksUntilMove = ticksBetweenMoves;
            snake.move(direction, eatFoodIfHit);
            if (!snake.isAlive) endGame();
            if (snake.isAlive && aiMode) direction = ai.move(snake, food);
        }
        renderFrame();
    }

    setInterval(tick, 1000 / TICKS_PER_SECOND);
}
