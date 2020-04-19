import { todayOnly } from "./today-only";
import * as saveStatsObj from "./save-stats";
import Spy = jasmine.Spy;

describe("todayOnly", function() {
    let saveStats: Spy;

    beforeEach(function() {
        saveStats = spyOn(saveStatsObj, "saveStats");
        saveStats.and.stub();
    });

    test("should update todayOnly with new value", function() {
        const result = todayOnly({ todayOnly: false, results: [] }, true);
        expect(result).toEqual({
            todayOnly: true,
            results: []
        });
    });

    test("should save stats in local storage", function() {
        const result = todayOnly({ todayOnly: false, results: [] }, true);
        expect(saveStats).toHaveBeenCalledWith(result);
    });
});
