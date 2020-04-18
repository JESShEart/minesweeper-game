import { Stats } from "../types/stats";
import { StatsReducer } from "../stats-reducer";
import { todayOnly } from "../functions/today-only";

export function todayOnlyAction(todayOnlyValue: boolean): StatsReducer {
    return function(stats: Stats): Stats {
        return todayOnly(stats, todayOnlyValue);
    };
}
