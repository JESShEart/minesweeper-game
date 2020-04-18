import { Stats } from "../../../stats/types/stats";
import { h } from "preact";
import * as style from "./summary-component.css";
import { StatLineComponent } from "../stat-line/stat-line-component";
import { getTotalSummary } from "../../../stats/functions/get-total-summary";

interface Props {
    stats: Stats;
}

export function TotalSummaryComponent(props: Props): h.JSX.Element {
    const { stats } = props;
    const { totalTime, games, wins, winRate } = getTotalSummary(stats);

    return (
        <div className={style.summary}>
            <h3>All Modes</h3>
            <div className={style.statLines}>
                <StatLineComponent label="Games" value={games} />
                <StatLineComponent label="Wins" value={wins} />
                <StatLineComponent label="Wins (%)" value={winRate} />
                <StatLineComponent label="Total Play Time" value={totalTime} />
            </div>
        </div>
    );
}
