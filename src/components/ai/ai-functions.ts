import { AiMemory, Outcome } from "./ai-memory";
import Square from "../mine-sweeper/square/square";
import { realPosition } from "../mine-sweeper/board-functions";
import Position from "../mine-sweeper/position";

const initialOutcome = (): Outcome => ({
    trials: 0,
    successes: 0,
    successRate: 0
});

export function updateOutcome(
    outcome: Outcome = initialOutcome(),
    success: boolean
): Outcome {
    const trials = outcome.trials + 1;
    const successes = success ? outcome.successes + 1 : outcome.successes;
    const successRate = Math.floor((successes * 100) / trials);
    return { trials, successes, successRate };
}

export function generateKey({ x, y }: Position, squares: Square[][]): string {
    const adjacentSquares = [
        // // 3 rows above
        // { x: x - 3, y: y - 3 },
        // { x: x - 2, y: y - 3 },
        // { x: x - 1, y: y - 3 },
        // { x, y: y - 3 },
        // { x: x + 1, y: y - 3 },
        // { x: x + 2, y: y - 3 },
        // { x: x + 3, y: y - 3 },
        // 2 rows above
        // { x: x - 3, y: y - 2 },
        { x: x - 2, y: y - 2 },
        { x: x - 1, y: y - 2 },
        { x, y: y - 2 },
        { x: x + 1, y: y - 2 },
        { x: x + 2, y: y - 2 },
        // { x: x + 3, y: y - 2 },
        // row above
        // { x: x - 3, y: y - 1 },
        { x: x - 2, y: y - 1 },
        { x: x - 1, y: y - 1 },
        { x, y: y - 1 },
        { x: x + 1, y: y - 1 },
        { x: x + 2, y: y - 1 },
        // { x: x + 3, y: y - 1 },
        // same row
        // { x: x - 3, y },
        { x: x - 2, y },
        { x: x - 1, y },
        { x, y },
        { x: x + 1, y },
        { x: x + 2, y },
        // { x: x + 3, y },
        // row below
        // { x: x - 3, y: y + 1 },
        { x: x - 2, y: y + 1 },
        { x: x - 1, y: y + 1 },
        { x, y: y + 1 },
        { x: x + 1, y: y + 1 },
        { x: x + 2, y: y + 1 },
        // { x: x + 3, y: y + 1 },
        // 2 rows below
        // { x: x - 3, y: y + 2 },
        { x: x - 2, y: y + 2 },
        { x: x - 1, y: y + 2 },
        { x, y: y + 2 },
        { x: x + 1, y: y + 2 },
        { x: x + 2, y: y + 2 },
        // { x: x + 3, y: y + 2 },
        // 3 rows below
        // { x: x - 3, y: y + 3 },
        // { x: x - 2, y: y + 3 },
        // { x: x - 1, y: y + 3 },
        // { x, y: y + 3 },
        // { x: x + 1, y: y + 3 },
        // { x: x + 2, y: y + 3 },
        // { x: x + 3, y: y + 3 }
    ];
    return adjacentSquares.reduce((key, position) => {
        if (!realPosition(position, squares.length)) {
            return `${key}-`;
        }
        const { revealed, adjacentMines } = squares[position.y][position.x];
        const append = revealed ? adjacentMines : "?";
        return `${key}${append}`;
    }, "");
}

export function updateAiMemory(
    aiMemory: AiMemory,
    squares: Square[][],
    position: Position
): AiMemory {
    const key = generateKey(position, squares);
    const outcome = aiMemory.outcomes[key];
    const confidence = outcome ? outcome.successRate : 0;
    const trials = outcome ? outcome.trials : 0;
    return {
        ...aiMemory,
        lastMove: {
            confidence,
            trials,
            position
        },
        outcomes: {
            ...aiMemory.outcomes,
            [key]: updateOutcome(
                aiMemory.outcomes[key],
                !squares[position.y][position.x].mine
            )
        }
    };
}

export function getBestMove(aiMemory: AiMemory, squares: Square[][]): Position {
    let bestPosition: Position = { x: 0, y: 0 };
    let bestSuccessRate = -1;
    let bestPositionTrials = 1;
    for (const row of squares) {
        for (const { position } of row) {
            if (!squares[position.y][position.x].revealed) {
                const key = generateKey(position, squares);
                const outcome = aiMemory.outcomes[key];
                const positionSuccessRate = outcome ? outcome.successRate : 0;
                const positionTrials = outcome ? outcome.trials : -1;

                const betterSuccessRate = positionSuccessRate > bestSuccessRate;

                const sameSuccessRateWithLessTrials =
                    Math.floor(positionSuccessRate) ===
                        Math.floor(bestSuccessRate) &&
                    bestPositionTrials > positionTrials;

                if (betterSuccessRate || sameSuccessRateWithLessTrials) {
                    bestPosition = position;
                    bestSuccessRate = positionSuccessRate;
                    bestPositionTrials = positionTrials;
                }
            }
        }
    }
    return bestPosition;
}
