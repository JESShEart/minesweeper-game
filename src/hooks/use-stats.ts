import { statsReducer, StatsReducer } from "../stats/stats-reducer";
import { Stats } from "../stats/types/stats";
import { loadStats } from "../stats/functions/load-stats";
import { useReducer } from "preact/hooks";
import { DispatchFunction } from "./types/dispatch-function";

interface StatsHook {
    stats: Stats;
    statsDispatch: DispatchFunction<StatsReducer>;
}

const initialState = loadStats();
let stats: Stats = initialState;
let statsDispatch: DispatchFunction<StatsReducer> = () => {
    return;
};

export function useStats(): StatsHook {
    return { stats, statsDispatch };
}

export function useStatsReducer(): StatsHook {
    const [state, dispatch] = useReducer(statsReducer, initialState);
    stats = state;
    statsDispatch = dispatch;
    return useStats();
}
