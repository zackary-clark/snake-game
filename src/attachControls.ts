import { Direction } from "./types/Direction.js";

export function attachControls(setDirection: (newDirection: Direction) => void) {
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
        }
    });
}
