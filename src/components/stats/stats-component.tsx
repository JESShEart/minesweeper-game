import { h } from "preact";
import { Stats } from "../../stats/types/stats";
import { StatsDispatch } from "../../stats/stats-reducer";
import { DifficultySummaryComponent } from "./summary/difficulty-summary-component";
import { EASY, HARD, NORMAL } from "../../minesweeper/types/difficulty";
import * as style from "./stats-component.css";
import { TotalSummaryComponent } from "./summary/total-summary-component";
import { todayOnlyAction } from "../../stats/actions/today-only-action";
import { useEffect } from "preact/hooks";
import { TitleUpdater } from "../app-component";
import { statsRouteProps } from "./stats-route-props";

interface Props {
    stats: Stats;
    dispatch: StatsDispatch;
    updateTitle: TitleUpdater;
}

export function StatsComponent(props: Props): h.JSX.Element {
    const { stats, dispatch, updateTitle } = props;
    const heading = stats.todayOnly ? "Today" : "All Time";

    useEffect(function() {
        updateTitle(statsRouteProps.title);
    }, []);

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
                <DifficultySummaryComponent difficulty={EASY} stats={stats} />
                <DifficultySummaryComponent difficulty={NORMAL} stats={stats} />
                <DifficultySummaryComponent difficulty={HARD} stats={stats} />
            </div>
            <small>ℹ️ Stats are only recorded for finished games!</small>
        </div>
    );
}
