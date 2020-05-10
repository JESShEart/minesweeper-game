import { DIFFICULTIES } from "./difficulty";

describe("DIFFICULTIES", function() {
    test("should have length > 0", function() {
        expect(DIFFICULTIES.length > 0).toBeTruthy();
    });
});
