import { h } from "preact";
import * as style from "./timer-component.css";
import { useEffect, useState } from "preact/hooks";
import { toHoursMinutesSeconds } from "./to-hours-minutes-seconds";

interface Props {
    startedAt: number | null;
    finishedAt: number | null;
}

function computeElapsedTime(
    startedAt: number | null,
    finishedAt: number | null
): number {
    if (startedAt && finishedAt) {
        return finishedAt - startedAt;
    } else if (startedAt) {
        return Date.now() - startedAt;
    } else {
        return 0;
    }
}

export function TimerComponent(props: Props): h.JSX.Element {
    const { startedAt, finishedAt } = props;
    const [elapsedTime, setElapsedTime] = useState<number>(
        computeElapsedTime(startedAt, finishedAt)
    );
    const hiddenClass = startedAt ? "" : style.hide;

    useEffect(function() {
        const timer = window.setInterval(function(): void {
            setElapsedTime(computeElapsedTime(startedAt, finishedAt));
        }, 100);
        return function(): void {
            clearInterval(timer);
        };
    });

    return (
        <div className={`${style.container} ${hiddenClass}`}>
            <div className={style.timer}>
                {toHoursMinutesSeconds(elapsedTime)}&nbsp;⏱
            </div>
        </div>
    );
}
