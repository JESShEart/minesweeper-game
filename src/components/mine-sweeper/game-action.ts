import Game from "./types/game";

export type GameAction = (game: Game) => Game;

export type GameDispatch = (action: GameAction) => void;

export default function gameReducer(game: Game, action: GameAction): Game {
    return action(game);
}
