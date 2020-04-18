import { Stats } from "./types/stats";

export type StatsReducer = (stats: Stats) => Stats;

export type StatsDispatch = (action: StatsReducer) => void;

export function statsReducer(stats: Stats, action: StatsReducer): Stats {
    return action(stats);
}
