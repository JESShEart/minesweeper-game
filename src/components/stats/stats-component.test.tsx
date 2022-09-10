/* eslint-disable @typescript-eslint/no-empty-function */
/// <reference types="enzyme-adapter-preact-pure" />
import { shallow, ShallowWrapper } from "enzyme";
import { StatsComponent } from "./stats-component";
import { Stats } from "../../stats/types/stats";
import * as todayOnlyActionObj from "../../stats/actions/today-only-action";
import { DifficultySummaryComponent } from "./summary/difficulty-summary-component";
import { DIFFICULTIES } from "../../minesweeper/types/difficulty";
import { TotalSummaryComponent } from "./summary/total-summary-component";
import { statsRouteProps } from "./stats-route-props";
import { h } from "preact";

describe("StatsComponent", function() {
    let wrapper: ShallowWrapper<h.JSX.Element>;
    let stats: Stats;
    let todayOnlyAction: jasmine.Spy;

    function setup(todayOnly: boolean): void {
        stats = {
            todayOnly,
            results: []
        } as Stats;
        const dispatch = function(): void {};
        todayOnlyAction = spyOn(todayOnlyActionObj, "todayOnlyAction");
        wrapper = shallow(<StatsComponent stats={stats} dispatch={dispatch} />);
    }

    test("should put Today in heading when today only is true", function() {
        setup(true);
        expect(wrapper.find("h2").text()).toBe("Game Stats: Today");
    });

    test("should put All TIme in heading when today only is false", function() {
        setup(false);
        expect(wrapper.find("h2").text()).toBe("Game Stats: All Time");
    });

    test("should call todayOnlyAction with true, when today button is clicked", function() {
        setup(true);
        wrapper.find("#todayButton").simulate("click");
        expect(todayOnlyAction).toHaveBeenCalledWith(true);
    });

    test("should call todayOnlyAction with false, when All Time button is clicked", function() {
        setup(true);
        wrapper.find("#allTimeButton").simulate("click");
        expect(todayOnlyAction).toHaveBeenCalledWith(false);
    });

    test("should render total difficulty summary", function() {
        setup(true);
        expect(wrapper.find(TotalSummaryComponent).props().stats).toBe(stats);
    });

    DIFFICULTIES.forEach(function(difficulty) {
        test(`should render ${difficulty.name} difficulty summary`, function() {
            setup(true);
            expect(
                wrapper
                    .find(DifficultySummaryComponent)
                    .findWhere(dsc => dsc.props().difficulty === difficulty)
                    .props().stats
            ).toBe(stats);
        });
    });

    test("should update title", function() {
        setup(true);
        expect(document.title).toContain(statsRouteProps.title);
    });
});
