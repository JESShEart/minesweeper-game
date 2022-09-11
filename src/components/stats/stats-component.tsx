import { h } from "preact";
import { Stats } from "../../stats/types/stats";
import { StatsDispatch } from "../../stats/stats-reducer";
import { DifficultySummaryComponent } from "./summary/difficulty-summary-component";
import {
    EASY,
    EASY_PLUS,
    EASY_PLUS_PLUS,
    HARD,
    HARD_PLUS,
    HARD_PLUS_PLUS,
    NORMAL,
    NORMAL_PLUS,
    NORMAL_PLUS_PLUS
} from "../../minesweeper/types/difficulty";
import * as style from "./stats-component.css";
import { TotalSummaryComponent } from "./summary/total-summary-component";
import { todayOnlyAction } from "../../stats/actions/today-only-action";
import { statsRouteProps } from "./stats-route-props";
import { useUpdateTitle } from "../../hooks/use-update-title";
import { getDifficultySummary } from "../../stats/functions/get-difficulty-summary";

interface Props {
    stats: Stats;
    dispatch: StatsDispatch;
}

export function StatsComponent(props: Props): h.JSX.Element {
    const { stats, dispatch } = props;
    const heading = stats.todayOnly ? "Today" : "All Time";
    const summaries = [
        [EASY, EASY_PLUS, EASY_PLUS_PLUS],
        [NORMAL, NORMAL_PLUS, NORMAL_PLUS_PLUS],
        [HARD, HARD_PLUS, HARD_PLUS_PLUS]
    ];

    useUpdateTitle(statsRouteProps.title);

    function allTime(): void {
        dispatch(todayOnlyAction(false));
    }

    function todayOnly(): void {
        dispatch(todayOnlyAction(true));
    }

    return (
        <div>
            <div className={style.filters}>
                <button id="allTimeButton" onClick={allTime}>
                    All Time
                </button>
                <button id="todayButton" onClick={todayOnly}>
                    Today
                </button>
            </div>
            <h2>Game Stats: {heading}</h2>
            <div className={style.summaries}>
                <TotalSummaryComponent stats={stats} />
            </div>
            {summaries.map((row, i) => (
                <div key={i} className={style.summaries}>
                    {row.map((difficulty, j) => (
                        <DifficultySummaryComponent
                            key={`${i}-${j}`}
                            difficulty={difficulty}
                            summary={getDifficultySummary(stats, difficulty)}
                        />
                    ))}
                </div>
            ))}
            <small>ℹ️ Stats are only recorded for finished games!</small>
        </div>
    );
}
