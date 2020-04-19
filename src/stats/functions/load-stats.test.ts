import { loadStats } from "./load-stats";
import Spy = jasmine.Spy;

describe("loadStats", function() {
    let getItem: Spy;

    beforeEach(function() {
        getItem = spyOn(Storage.prototype, "getItem");
    });

    test("should return default stats, local storage is empty", function() {
        getItem.and.returnValue(null);
        expect(loadStats()).toEqual({
            todayOnly: false,
            results: []
        });
    });

    test("should return default stats, when local storage fails", function() {
        getItem.and.throwError("whatever");
        expect(loadStats()).toEqual({
            todayOnly: false,
            results: []
        });
    });

    test("should return stats from local storage", function() {
        const stats = { todayOnly: true, results: [{ win: true }] };
        getItem.and.returnValue(JSON.stringify(stats));
        expect(loadStats()).toEqual(stats);
    });
});
