import { useReducer } from "preact/hooks";
import { GameReducer, gameReducer } from "../minesweeper/game-reducer";
import { resetGame } from "../minesweeper/functions/reset-game";
import { EASY } from "../minesweeper/types/difficulty";
import { Game } from "../minesweeper/types/game";
import { DispatchFunction } from "./types/dispatch-function";

interface GameHook {
    game: Game;
    gameDispatch: DispatchFunction<GameReducer>;
}

const initialState = resetGame(EASY);
let game: Game = initialState;
let gameDispatch: DispatchFunction<GameReducer> = () => {
    return;
};

export function useGame(): GameHook {
    return { game, gameDispatch };
}

export function useGameReducer(): GameHook {
    const [state, dispatch] = useReducer(gameReducer, initialState);
    game = state;
    gameDispatch = dispatch;
    return useGame();
}
