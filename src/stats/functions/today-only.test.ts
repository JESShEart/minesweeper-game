import { todayOnly } from "./today-only";

describe("todayOnly", function() {
    test("should update todayOnly with new value", function() {
        const result = todayOnly({ todayOnly: false, results: [] }, true);
        expect(result).toEqual({
            todayOnly: true,
            results: []
        });
    });
});
