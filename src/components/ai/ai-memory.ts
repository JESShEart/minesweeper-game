import Position from "../mine-sweeper/position";

export interface Outcome {
    successRate: number;
    successes: number;
    trials: number;
}

export interface AiMemory {
    outcomes: {
        [key: string]: Outcome;
    };
    continue: boolean;
    speed: number;
    lastMove: {
        confidence: number;
        position: Position;
        trials: number;
    };
    gamesWon: number;
    totalGames: number;
    recentGamesWon: number;
    recentTotalGames: number;
}
