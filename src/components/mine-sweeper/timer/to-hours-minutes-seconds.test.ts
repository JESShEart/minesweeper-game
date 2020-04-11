import { toHoursMinutesSeconds } from "./to-hours-minutes-seconds";

describe("toHoursMinutesSeconds", function() {
    test("should be 0 for 999 milliseconds", function() {
        expect(toHoursMinutesSeconds(999)).toBe("0");
    });

    test("should be 1 for 1 second", function() {
        expect(toHoursMinutesSeconds(1000)).toBe("1");
    });

    test("should be 1:00 for 60 seconds", function() {
        expect(toHoursMinutesSeconds(60000)).toBe("1:00");
    });

    test("should be 1:01 for 61 seconds", function() {
        expect(toHoursMinutesSeconds(61000)).toBe("1:01");
    });

    test("should be 1:12 for 72 seconds", function() {
        expect(toHoursMinutesSeconds(72000)).toBe("1:12");
    });

    test("should be 10:10 for 610 seconds", function() {
        expect(toHoursMinutesSeconds(610000)).toBe("10:10");
    });

    test("should be 1:01:01 for 3661 seconds", function() {
        expect(toHoursMinutesSeconds(3661000)).toBe("1:01:01");
    });

    test("should be 999:59:59 for 3599999999 milliseconds", function() {
        expect(toHoursMinutesSeconds(3599999999)).toBe("999:59:59");
    });
});
