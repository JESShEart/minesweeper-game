import { Game } from "../types/game";

export function toggleFlagging(game: Game): Game {
    return {
        ...game,
        flagging: !game.flagging
    };
}
