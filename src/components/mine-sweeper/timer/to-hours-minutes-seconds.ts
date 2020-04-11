function zeroPad(d: number): string {
    return `0${d}`.slice(-2);
}

function toAbsHoursMinutesSeconds(millis: number): string {
    const d = Math.floor(Math.abs(millis) / 1000);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);

    if (h > 0) {
        return `${h}:${zeroPad(m)}:${zeroPad(s)}`;
    } else if (m > 0) {
        return `${m}:${zeroPad(s)}`;
    } else {
        return `${s}`;
    }
}

export function toHoursMinutesSeconds(millis: number): string {
    const sign = millis < 0 ? "-" : "";
    const absHoursMinutesSeconds = toAbsHoursMinutesSeconds(millis);
    return `${sign}${absHoursMinutesSeconds}`;
}
