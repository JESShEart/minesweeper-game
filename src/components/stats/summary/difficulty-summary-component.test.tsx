import { shallow, ShallowWrapper } from "enzyme";
import { ReactElement } from "react";
import { h } from "preact";
import { DifficultySummaryComponent } from "./difficulty-summary-component";
import { Difficulty } from "../../../minesweeper/types/difficulty";
import { Stats } from "../../../stats/types/stats";
import * as getDifficultySummaryObj from "../../../stats/functions/get-difficulty-summary";
import { DifficultySummary } from "../../../stats/types/difficulty-summary";
import { Result } from "../../../stats/types/result";
import { StatLineComponent } from "../stat-line/stat-line-component";
import Spy = jasmine.Spy;

describe("DifficultySummaryComponent", function() {
    let wrapper: ShallowWrapper;
    let getDifficultySummary: Spy;

    const difficulty: Readonly<Difficulty> = {
        name: "EASY",
        displayName: "Test",
        height: 1,
        width: 2,
        mineRatio: 3
    };

    const stats: Readonly<Stats> = {
        results: [] as Readonly<Array<Result>>,
        todayOnly: true
    } as Stats;

    const summary: Readonly<DifficultySummary> = {
        games: 2,
        wins: 1,
        winRate: "Rate",
        fastestTime: "Fastest",
        averageTime: "Average"
    };

    beforeEach(function(): void {
        getDifficultySummary = spyOn(
            getDifficultySummaryObj,
            "getDifficultySummary"
        );
        getDifficultySummary.and.returnValue(summary);
        wrapper = shallow(
            (
                <DifficultySummaryComponent
                    stats={stats}
                    difficulty={difficulty}
                />
            ) as ReactElement
        );
    });

    test("should call getDifficultySummary with props", function() {
        expect(getDifficultySummary).toHaveBeenCalledWith(stats, difficulty);
    });

    test("should set difficulty title", function() {
        expect(wrapper.find("h3").text()).toBe(
            `${difficulty.displayName} (${difficulty.width}x${difficulty.height})`
        );
    });

    test("should set stat line values from summary", function() {
        function getStatLineValue(label: string): string {
            return wrapper
                .find(StatLineComponent)
                .findWhere(slc => slc.props().label === label)
                .props().value;
        }

        expect(getStatLineValue("Games")).toBe(summary.games);
        expect(getStatLineValue("Wins")).toBe(summary.wins);
        expect(getStatLineValue("Wins (%)")).toBe(summary.winRate);
        expect(getStatLineValue("Fastest Time")).toBe(summary.fastestTime);
        expect(getStatLineValue("Average Time")).toBe(summary.averageTime);
    });
});
