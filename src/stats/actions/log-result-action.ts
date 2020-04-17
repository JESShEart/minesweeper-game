import { Game } from "../../mine-sweeper/types/game";
import { Stats } from "../types/stats";
import { StatsReducer } from "../stats-reducer";
import { logResult } from "../functions/log-result";

export function logResultAction(game: Game): StatsReducer {
    return function(stats: Stats): Stats {
        return logResult(stats, game);
    };
}
