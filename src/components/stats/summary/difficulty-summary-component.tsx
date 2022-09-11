import { h } from "preact";
import { Difficulty } from "../../../minesweeper/types/difficulty";
import { StatLineComponent } from "../stat-line/stat-line-component";
import * as style from "./summary-component.css";
import { DifficultySummary } from "../../../stats/types/difficulty-summary";

interface Props {
    difficulty: Difficulty;
    summary: DifficultySummary;
}

export function DifficultySummaryComponent(props: Props): h.JSX.Element {
    const { difficulty, summary } = props;
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
