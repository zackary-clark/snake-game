import { AIType } from "../ai/ai";
import { getElementById } from "../helpers";

interface StoredHighScore {
    min: number;
    avg: number;
    max: number;
    games: number;
}

export class HighScore {
    public min: number | undefined;
    public avg: number;
    public max: number;

    private games: number;
    private player: AIType;

    constructor(playerName: AIType) {
        this.player = playerName;

        const stored = this.getLocalStorage();

        this.min = stored?.min;
        this.avg = stored?.avg ?? 0;
        this.max = stored?.max ?? 0;
        this.games = stored?.games ?? 0;
    }

    addNewScore(score: number) {
        this.min = this.min === undefined || score < this.min ? score : this.min;
        this.max = score > this.max ? score : this.max;

        this.games++;
        this.avg += (score - this.avg) / this.games;

        this.setLocalStorage();
    }

    renderScore() {
        getElementById<HTMLTableCellElement>(`${this.player}-min`).textContent = this.min?.toFixed(0) ?? "0";
        getElementById<HTMLTableCellElement>(`${this.player}-avg`).textContent = this.avg.toFixed(0);
        getElementById<HTMLTableCellElement>(`${this.player}-max`).textContent = this.max.toFixed(0);
    }

    private getLocalStorage(): StoredHighScore | null {
        const stored = localStorage.getItem(this.player);
        return stored ? JSON.parse(stored) : null;
    }

    private setLocalStorage() {
        localStorage.setItem(this.player, JSON.stringify({
            min: this.min,
            avg: this.avg,
            max: this.max,
            games: this.games,
        }));
    }
}
