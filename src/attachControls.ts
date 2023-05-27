import { AIType } from "./ai/ai";
import { getElementById } from "./helpers";
import { Direction } from "./types/Direction";

interface ControlCallbacks {
    setDirection: (newDirection: Direction) => void;
    resetGame: () => void;
    changeAIMode: (type: AIType) => void;
    lowerSpeed: () => void;
    raiseSpeed: () => void;
}

export function attachControls({
    setDirection,
    resetGame,
    changeAIMode,
    lowerSpeed,
    raiseSpeed,
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
            case "-":
                lowerSpeed();
                break;
            case "=":
            case "+":
                raiseSpeed();
                break;
        }
    });
    const playerSelect = getElementById<HTMLSelectElement>("player");
    playerSelect.addEventListener("change", (event) => {
        // @ts-ignore
        changeAIMode(event.target.value)
    })
}
