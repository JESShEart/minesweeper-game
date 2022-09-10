import { h } from "preact";
import { StatsComponent } from "./stats-component";
import { useStats } from "../../hooks/use-stats";

export function StatsContainer(): h.JSX.Element {
    const { stats, statsDispatch } = useStats();
    return <StatsComponent stats={stats} dispatch={statsDispatch} />;
}
