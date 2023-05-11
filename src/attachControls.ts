import { aiType } from "./ai/ai";
import { Direction } from "./types/Direction";

interface ControlCallbacks {
    setDirection: (newDirection: Direction) => void;
    resetGame: () => void;
    changeAIMode: (type: aiType) => void;
}

export function attachControls({
    setDirection,
    resetGame,
    changeAIMode,
}: ControlCallbacks) {
    window.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowUp":
            case "w":
                setDirection("up");
                break;
            case "ArrowDown":
            case "s":
                setDirection("down");
                break;
            case "ArrowLeft":
            case "a":
                setDirection("left");
                break;
            case "ArrowRight":
            case "d":
                setDirection("right");
                break;
            case "Enter":
            case "Escape":
                resetGame();
                break;
            case "j":
                changeAIMode("dijkstra");
                break;
            case "n":
                changeAIMode("naive");
                break;
            case "m":
                changeAIMode("human");
                break;
        }
    });
}
