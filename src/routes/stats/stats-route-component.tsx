import { h } from "preact";
import * as style from "./style.css";
import { StatsComponent } from "../../components/stats/stats-component";
import { Stats } from "../../stats/types/stats";
import { StatsDispatch } from "../../stats/stats-reducer";

interface Props {
    stats: Stats;
    dispatch: StatsDispatch;
}

function StatsRouteComponent(props: Props): h.JSX.Element {
    const { stats, dispatch } = props;

    return (
        <div className={style.profile}>
            <StatsComponent stats={stats} dispatch={dispatch} />
        </div>
    );
}

export default StatsRouteComponent;
