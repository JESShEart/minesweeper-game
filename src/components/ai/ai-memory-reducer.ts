import { Reducer } from "preact/hooks";
import { AiMemory } from "./ai-memory";
import { Game } from "../mine-sweeper/game";
import { getBestMove, updateAiMemory } from "./ai-functions";
import { BoardAction, ResetGame, RevealSquare } from "../mine-sweeper/board-reducer";
import Position from "../mine-sweeper/position";

export class AiContinueAction {
    execute(aiMemory: AiMemory): AiMemory {
        return {
            ...aiMemory,
            continue: true
        };
    }
}

export class AiResetRecentAction {
    execute(aiMemory: AiMemory): AiMemory {
        return {
            ...aiMemory,
            recentGamesWon: 0,
            recentTotalGames: 0
        };
    }
}

export class AiPauseAction {
    execute(aiMemory: AiMemory): AiMemory {
        return {
            ...aiMemory,
            continue: false
        };
    }
}

export class AiSpeedAction {
    private readonly speed: number;
    constructor(speed: number) {
        this.speed = speed;
    }

    execute(aiMemory: AiMemory): AiMemory {
        return {
            ...aiMemory,
            speed: this.speed
        };
    }
}

export class AiPlayAction {
    private readonly game: Game;
    private readonly gameDispatch: (revealAction: BoardAction) => void;

    constructor(game: Game, gameDispatch: (revealAction: BoardAction) => void) {
        this.game = game;
        this.gameDispatch = gameDispatch;
    }

    execute(aiMemory: AiMemory): AiMemory {
        if (this.game.status !== "PLAY") {
            aiMemory.totalGames++;
            aiMemory.recentTotalGames++;
            const zeroOrOne = this.game.status === "WIN" ? 1 : 0;
            aiMemory.gamesWon += zeroOrOne;
            aiMemory.recentGamesWon += zeroOrOne;
            this.gameDispatch(new ResetGame({ size: 10, mineRatio: 8 }));
            return aiMemory;
        } else {
            const squares = this.game.board;
            const position: Position = getBestMove(aiMemory, squares);
            this.gameDispatch(new RevealSquare(position));
            return updateAiMemory(aiMemory, squares, position);
        }
    }
}

export type AiAction = AiPlayAction | AiSpeedAction | AiPauseAction;

export const aiReducer: Reducer<AiMemory, AiAction> = (
    game,
    action: AiAction
) => action.execute(game);
