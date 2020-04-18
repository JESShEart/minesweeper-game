export function getWinRate(wins: number, games: number): string {
    const rate = games ? (wins / games) * 100 : 0;
    const winRate = (Math.round(rate * 10) / 10).toFixed(1);
    return `${winRate}%`;
}
