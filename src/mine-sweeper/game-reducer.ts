import { Game } from "./types/game";

export type GameReducer = (game: Game) => Game;

export type GameDispatch = (action: GameReducer) => void;

export function gameReducer(game: Game, action: GameReducer): Game {
    return action(game);
}
