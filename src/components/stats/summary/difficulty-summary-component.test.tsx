/// <reference types="enzyme-adapter-preact-pure" />
import { shallow, ShallowWrapper } from "enzyme";
import { h } from "preact";
import { DifficultySummaryComponent } from "./difficulty-summary-component";
import { Difficulty } from "../../../minesweeper/types/difficulty";
import { DifficultySummary } from "../../../stats/types/difficulty-summary";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StatLineComponent } from "../stat-line/stat-line-component";

describe("DifficultySummaryComponent", function() {
    let wrapper: ShallowWrapper<h.JSX.Element>;

    const difficulty: Readonly<Difficulty> = {
        name: "EASY",
        displayName: "Test",
        height: 1,
        width: 2,
        mineRatio: 3
    };

    const summary: Readonly<DifficultySummary> = {
        games: 2,
        wins: 1,
        winRate: "Rate",
        fastestTime: "Fastest",
        averageTime: "Average"
    };

    beforeEach(function(): void {
        wrapper = shallow(
            <DifficultySummaryComponent
                difficulty={difficulty}
                summary={summary}
            />
        );
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
