import * as getTotalSummaryObj from "../../../stats/functions/get-total-summary";
import { shallow, ShallowWrapper } from "enzyme";
import { ReactElement } from "react";
import { h } from "preact";
import { TotalSummaryComponent } from "./total-summary-component";
import Spy = jasmine.Spy;
import { TotalSummary } from "../../../stats/types/total-summary";
import { Stats } from "../../../stats/types/stats";
import { Result } from "../../../stats/types/result";
import { StatLineComponent } from "../stat-line/stat-line-component";

describe("TotalSummaryComponent", function() {
    let wrapper: ShallowWrapper;
    let getTotalSummary: Spy;

    const stats: Readonly<Stats> = {
        results: [] as Readonly<Array<Result>>,
        todayOnly: true
    } as Stats;

    const summary: Readonly<TotalSummary> = {
        games: 2,
        wins: 1,
        totalTime: "Total",
        winRate: "Rate"
    };

    beforeEach(function(): void {
        getTotalSummary = spyOn(getTotalSummaryObj, "getTotalSummary");
        getTotalSummary.and.returnValue(summary);
        wrapper = shallow(
            (<TotalSummaryComponent stats={stats} />) as ReactElement
        );
    });

    test("should call getTotalSummary with stats", function() {
        expect(getTotalSummary).toHaveBeenCalledWith(stats);
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
        expect(getStatLineValue("Total Play Time")).toBe(summary.totalTime);
    });
});
