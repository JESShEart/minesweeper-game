/* eslint-disable @typescript-eslint/no-empty-function */
import { shallow, ShallowWrapper } from "enzyme";
import { StatsComponent } from "./stats-component";
import { h } from "preact";
import { ReactElement } from "react";
import { Stats } from "../../stats/types/stats";
import * as todayOnlyActionObj from "../../stats/actions/today-only-action";
import { DifficultySummaryComponent } from "./summary/difficulty-summary-component";
import { EASY, HARD, NORMAL } from "../../minesweeper/types/difficulty";
import { TotalSummaryComponent } from "./summary/total-summary-component";
import { statsRouteProps } from "./stats-route-props";
import Spy = jasmine.Spy;

describe("StatsComponent", function() {
    let wrapper: ShallowWrapper;
    let stats: Stats;
    let title: string;
    let todayOnlyAction: Spy;

    function setup(todayOnly: boolean): void {
        stats = {
            todayOnly,
            results: []
        } as Stats;
        const titleUpdater = function(it: string): void {
            title = it;
        };
        const dispatch = function(): void {};
        todayOnlyAction = spyOn(todayOnlyActionObj, "todayOnlyAction");
        wrapper = shallow(
            (
                <StatsComponent
                    stats={stats}
                    dispatch={dispatch}
                    updateTitle={titleUpdater}
                />
            ) as ReactElement
        );
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

    test("should render EASY difficulty summary", function() {
        setup(true);
        expect(
            wrapper
                .find(DifficultySummaryComponent)
                .findWhere(dsc => dsc.props().difficulty === EASY)
                .props().stats
        ).toBe(stats);
    });

    test("should render NORMAL difficulty summary", function() {
        setup(true);
        expect(
            wrapper
                .find(DifficultySummaryComponent)
                .findWhere(dsc => dsc.props().difficulty === NORMAL)
                .props().stats
        ).toBe(stats);
    });

    test("should render HARD difficulty summary", function() {
        setup(true);
        expect(
            wrapper
                .find(DifficultySummaryComponent)
                .findWhere(dsc => dsc.props().difficulty === HARD)
                .props().stats
        ).toBe(stats);
    });

    test("should update title", function() {
        setup(true);
        expect(title).toBe(statsRouteProps.title);
    });
});
