export function getTotalTime(times: number[]): number {
    return times.reduce((total, time) => total + time, 0);
}
