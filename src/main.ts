import { AI, createAI, AIType } from "./ai/ai";
import { attachControls } from "./attachControls";
import { Board } from "./Board";
import { resizeCanvas } from "./canvas";
import { BOARD_SIZE, BORDER_COLOR, BORDER_SIZE } from "./config";
import { getElementById } from "./helpers";
import { HighScores } from "./HighScores/HighScores";
import { Food } from "./pieces/Food";
import { Snake } from "./pieces/Snake";
import { Direction } from "./types/Direction";

const defaultFoodX = 3 * (BOARD_SIZE / 4);
const defaultFoodY = BOARD_SIZE / 2;
const borderStyle = `${BORDER_SIZE}px solid ${BORDER_COLOR}`;
const speedOptions = [10, 20, 50, 100, 200, 500];

export function main() {
    const infoPanel = getElementById<HTMLDivElement>("info-panel");
    infoPanel.style.borderTop = borderStyle;
    infoPanel.style.borderBottom = borderStyle;
    infoPanel.style.borderRight = borderStyle;
    infoPanel.style.height = `calc(100% - ${BORDER_SIZE * 2}px)`;

    const board = new Board();
    let snake = new Snake();
    let food = new Food(defaultFoodX, defaultFoodY);

    let ai: AI | undefined;
    let direction: Direction | null = null;
    let speed: number = 0;

    let score = 0;
    const highScores = new HighScores();

    function resetGame() {
        board.clear();
        snake = new Snake();
        food = new Food(defaultFoodX, defaultFoodY);
        direction = null;
        score = 0;
    }

    attachControls({
        setDirection: (newDirection: Direction) => {
            if (!ai) direction = newDirection
        },
        resetGame: resetGame,
        changeAIMode: (type: AIType) => {
            resetGame();
            ai = createAI(type);
        },
        lowerSpeed: () => {
            if (speed > 0) {
                speed--;
            }
        },
        raiseSpeed: () => {
            if (speed < speedOptions.length - 1) {
                speed++;
            }
        }
    });

    function renderFrame() {
        board.clear();
        resizeCanvas();

        const scoreElement = getElementById<HTMLParagraphElement>("score");
        scoreElement.textContent = score.toString();

        highScores.renderScores();

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
        highScores.addNewScore(score, ai?.type);
    }

    function tick() {
        if (snake.isAlive) {
            snake.move(direction, eatFoodIfHit);
            if (!snake.isAlive) endGame();
            if (snake.isAlive && ai) {
                direction = ai.move(snake, food);
            }
        }
        renderFrame();
    }

    (function loop() {
        setTimeout(() => {
            tick();
            loop();
        }, 1000 / speedOptions[speed]);
    })();
}
