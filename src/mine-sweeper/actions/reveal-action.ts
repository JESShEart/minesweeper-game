import { Game } from "../types/game";
import { Square } from "../types/square";
import { GameReducer } from "../game-reducer";
import { reveal } from "../functions/reveal";
import { StatsDispatch } from "../../stats/stats-reducer";
import { logResultAction } from "../../stats/actions/log-result-action";

export function revealAction(
    square: Square,
    statsDispatch: StatsDispatch
): GameReducer {
    return function(game: Game): Game {
        const updatedGame = reveal(square, game);
        if (!game.finishedAt && !!updatedGame.finishedAt) {
            statsDispatch(logResultAction(updatedGame));
        }
        return updatedGame;
    };
}
