import Spy = jasmine.Spy;
import { saveStats } from "./save-stats";
import { Stats } from "../types/stats";

describe("saveStats", function() {
    let stats: Stats;
    let setItem: Spy;

    beforeEach(function() {
        setItem = spyOn(Storage.prototype, "setItem");
        stats = { todayOnly: true, results: [{ win: true }] } as Stats;
    });

    test("should set stats in local storage", function() {
        saveStats(stats);
        expect(setItem).toHaveBeenCalledWith("stats", JSON.stringify(stats));
    });

    test("should die gracefully when local storage set item fails", function() {
        setItem.and.throwError("whatever");
        expect(() => saveStats(stats)).not.toThrowError();
    });
});
