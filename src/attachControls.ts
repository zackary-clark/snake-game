import { Direction } from "./types/Direction";

interface ControlCallbacks {
    setDirection: (newDirection: Direction) => void;
    resetGame: () => void;
    toggleAIMode: () => void;
}

export function attachControls({
    setDirection,
    resetGame,
    toggleAIMode,
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
                resetGame();
                break;
            case " ":
                toggleAIMode();
                break;
        }
    });
}
