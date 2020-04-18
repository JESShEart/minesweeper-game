import { getWinRate } from "./get-win-rate";

describe("getWinRate", function() {
    const inputs: [string, number, number][] = [
        ["0.0%", 0, 0],
        ["10.0%", 1, 10],
        ["50.0%", 5, 10],
        ["20.8%", 21, 101],
        ["2.3%", 234, 10000],
        ["6.5%", 645, 10000],
        ["0.0%", 4, 10000],
        ["0.1%", 5, 10000],
        ["100.0%", 123, 123]
    ];

    inputs.forEach(function([rate, wins, games]) {
        test(`should be ${rate} for ${wins} wins of ${games} games`, function() {
            expect(getWinRate(wins, games)).toBe(rate);
        });
    });
});
