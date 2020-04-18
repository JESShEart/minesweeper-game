import { getRelevantResults } from "./get-relevant-results";
import { Result } from "../types/result";
import {
    Difficulty,
    EASY,
    HARD,
    NORMAL
} from "../../mine-sweeper/types/difficulty";

describe("getRelevantResults", function() {
    let easyYesterdayResult: Result;
    let easyStartOfTodayResult: Result;
    let easyTodayResult: Result;
    let normalYesterdayResult: Result;
    let normalTodayResult: Result;
    let hardYesterdayResult: Result;
    let hardTodayResult: Result;

    beforeEach(function() {
        const baseTime = new Date(`2001-02-03T10:17:34+0500`);
        const mockNow = baseTime.getTime();
        const startOfToday = new Date(baseTime);
        startOfToday.setHours(0, 0, 0, 0);
        const startOfTodayMillis = startOfToday.getTime();
        spyOn(Date, "now").and.returnValue(mockNow);

        function result(
            difficulty: Difficulty,
            finishedAtOffset: number
        ): Result {
            return {
                difficultyName: difficulty.name,
                finishedAt: finishedAtOffset + startOfTodayMillis
            } as Result;
        }

        easyYesterdayResult = result(EASY, -1);
        easyStartOfTodayResult = result(EASY, 0);
        easyTodayResult = result(EASY, 1);
        normalYesterdayResult = result(NORMAL, -1000);
        normalTodayResult = result(NORMAL, 1000);
        hardYesterdayResult = result(HARD, -10);
        hardTodayResult = result(HARD, 10);
    });

    test("should get all EASY results", function() {
        const relevantResults = getRelevantResults(
            {
                todayOnly: false,
                results: [
                    easyYesterdayResult,
                    easyStartOfTodayResult,
                    easyTodayResult,
                    normalYesterdayResult,
                    normalTodayResult,
                    easyTodayResult,
                    hardYesterdayResult,
                    hardTodayResult
                ]
            },
            EASY
        );

        expect(relevantResults).toEqual([
            easyYesterdayResult,
            easyStartOfTodayResult,
            easyTodayResult,
            easyTodayResult
        ]);
    });

    test("should get EASY results for today", function() {
        const relevantResults = getRelevantResults(
            {
                todayOnly: true,
                results: [
                    easyYesterdayResult,
                    easyStartOfTodayResult,
                    easyTodayResult,
                    normalYesterdayResult,
                    normalTodayResult,
                    easyTodayResult,
                    hardYesterdayResult,
                    hardTodayResult
                ]
            },
            EASY
        );

        expect(relevantResults).toEqual([
            easyStartOfTodayResult,
            easyTodayResult,
            easyTodayResult
        ]);
    });

    test("should get all NORMAL results", function() {
        const relevantResults = getRelevantResults(
            {
                todayOnly: false,
                results: [
                    normalTodayResult,
                    easyYesterdayResult,
                    easyTodayResult,
                    normalYesterdayResult,
                    normalTodayResult,
                    hardYesterdayResult,
                    hardTodayResult,
                    normalTodayResult
                ]
            },
            NORMAL
        );

        expect(relevantResults).toEqual([
            normalTodayResult,
            normalYesterdayResult,
            normalTodayResult,
            normalTodayResult
        ]);
    });

    test("should get NORMAL results for today", function() {
        const relevantResults = getRelevantResults(
            {
                todayOnly: true,
                results: [
                    normalTodayResult,
                    easyYesterdayResult,
                    easyTodayResult,
                    normalYesterdayResult,
                    normalTodayResult,
                    hardYesterdayResult,
                    hardTodayResult,
                    normalTodayResult
                ]
            },
            NORMAL
        );

        expect(relevantResults).toEqual([
            normalTodayResult,
            normalTodayResult,
            normalTodayResult
        ]);
    });

    test("should get all HARD results", function() {
        const relevantResults = getRelevantResults(
            {
                todayOnly: false,
                results: [
                    normalTodayResult,
                    easyYesterdayResult,
                    easyTodayResult,
                    hardTodayResult,
                    hardYesterdayResult
                ]
            },
            HARD
        );

        expect(relevantResults).toEqual([hardTodayResult, hardYesterdayResult]);
    });

    test("should get HARD results for today", function() {
        const relevantResults = getRelevantResults(
            {
                todayOnly: true,
                results: [
                    normalTodayResult,
                    easyYesterdayResult,
                    easyTodayResult,
                    hardTodayResult,
                    hardYesterdayResult
                ]
            },
            HARD
        );

        expect(relevantResults).toEqual([hardTodayResult]);
    });
});
