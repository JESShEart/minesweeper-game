import { getTotalTime } from "./get-total-time";

describe("getTotalTime", function() {
    test("should sum up times", function() {
        expect(getTotalTime([1, 2, 3, 4, 5])).toBe(15);
    });
});
