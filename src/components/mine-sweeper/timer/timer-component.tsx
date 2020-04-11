import { h } from "preact";
import * as style from "./timer-component.css";
import { useEffect, useState } from "preact/hooks";
import { toHoursMinutesSeconds } from "./to-hours-minutes-seconds";

interface Props {
    startedAt: number | null;
    finishedAt: number | null;
}

export function TimerComponent(props: Props): h.JSX.Element {
    const { startedAt, finishedAt } = props;
    const containerClassNames = `${style.container} ${
        startedAt ? "" : style.hide
    }`;

    function computeElapsedTime(): number {
        if (startedAt && finishedAt) {
            return finishedAt - startedAt;
        } else if (startedAt) {
            return Date.now() - startedAt;
        } else {
            return 0;
        }
    }

    const [elapsedTime, setElapsedTime] = useState<number>(
        computeElapsedTime()
    );

    useEffect(function() {
        const timer = window.setInterval(function(): void {
            setElapsedTime(computeElapsedTime());
        }, 100);
        return function(): void {
            clearInterval(timer);
        };
    });

    return (
        <div className={containerClassNames}>
            <div className={style.timer}>
                {toHoursMinutesSeconds(elapsedTime)}&nbsp;⏱
            </div>
        </div>
    );
}
