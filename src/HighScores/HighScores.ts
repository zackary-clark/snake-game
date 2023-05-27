import { AIType } from "../ai/ai";
import { HighScore } from "./HighScore";

export class HighScores {
    private scores: Record<AIType, HighScore>;

    public constructor() {
        // @ts-ignore
        this.scores = {};
        for (const aiTypeKey in AIType) {
            // @ts-ignore
            this.scores[aiTypeKey] = new HighScore(aiTypeKey);
        }
    }

    public renderScores() {
        Object.values(this.scores).forEach(score => score.renderScore());
    }

    public addNewScore(score: number, type?: AIType) {
        this.scores[type ?? AIType.human].addNewScore(score);
    }
}
