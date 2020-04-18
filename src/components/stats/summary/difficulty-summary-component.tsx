import { Stats } from "../../../stats/types/stats";
import { h } from "preact";
import { Difficulty } from "../../../mine-sweeper/types/difficulty";
import { StatLineComponent } from "../stat-line/stat-line-component";
import * as style from "./summary-component.css";
import { getDifficultySummary } from "../../../stats/functions/get-difficulty-summary";

interface Props {
    stats: Stats;
    difficulty: Difficulty;
}

export function DifficultySummaryComponent(props: Props): h.JSX.Element {
    const { stats, difficulty } = props;
    const summary = getDifficultySummary(stats, difficulty);
    const { games, wins, winRate, fastestTime, averageTime } = summary;

    return (
        <div className={style.summary}>
            <h3>
                {difficulty.displayName}{" "}
                <span className={style.dimensions}>
                    ({difficulty.width}x{difficulty.height})
                </span>
            </h3>
            <div className={style.statLines}>
                <StatLineComponent label="Games" value={games} />
                <StatLineComponent label="Wins" value={wins} />
                <StatLineComponent label="Wins (%)" value={winRate} />
                <StatLineComponent label="Fastest Time" value={fastestTime} />
                <StatLineComponent label="Average Time" value={averageTime} />
            </div>
        </div>
    );
}
