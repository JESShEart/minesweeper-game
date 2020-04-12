import { GameReducer } from "../game-reducer";
import { Game } from "../types/game";
import { toggleFlagging } from "../functions/toggle-flagging";

export function toggleFlaggingAction(): GameReducer {
    return function(game: Game): Game {
        return toggleFlagging(game);
    };
}
