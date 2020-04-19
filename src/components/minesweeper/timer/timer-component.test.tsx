import { shallow, ShallowWrapper } from "enzyme";
import { h } from "preact";
import { ReactElement } from "react";
import { TimerComponent } from "./timer-component";
import * as style from "./timer-component.css";
import * as toHoursMinutesSecondsObj from "../../../mine-sweeper/functions/to-hours-minutes-seconds";
import Spy = jasmine.Spy;

const ELAPSED_TIME_MESSAGE = "#:##";

describe("TimerComponent", function() {
    let wrapper: ShallowWrapper;
    let nowSpy: Spy;
    let setIntervalSpy: Spy;
    let toHoursMinutesSeconds: Spy;

    beforeEach(function() {
        nowSpy = spyOn(Date, "now");
        setIntervalSpy = spyOn(window, "setInterval");
        toHoursMinutesSeconds = spyOn(
            toHoursMinutesSecondsObj,
            "toHoursMinutesSeconds"
        );
        toHoursMinutesSeconds.and.returnValue(ELAPSED_TIME_MESSAGE);
    });

    function setup(
        startedAt: number | null,
        finishedAt: number | null,
        now: number | null
    ): void {
        nowSpy.and.returnValue(now);
        wrapper = shallow(
            (
                <TimerComponent startedAt={startedAt} finishedAt={finishedAt} />
            ) as ReactElement
        );
    }

    test("should hide timer when startedAt is null", function() {
        setup(null, null, 0);
        expect(
            wrapper.find(`.${style.container}`).hasClass(style.hide)
        ).toBeTruthy();
    });

    test("should show timer when startedAt is not null", function() {
        setup(0, null, 0);
        expect(
            wrapper.find(`.${style.container}`).hasClass(style.hide)
        ).toBeFalsy();
    });

    test(`should show ${ELAPSED_TIME_MESSAGE} ⏱ message when startedAt is not null`, function() {
        setup(0, null, 0);
        expect(wrapper.find(`.${style.timer}`).text()).toBe(
            `${ELAPSED_TIME_MESSAGE} ⏱`
        );
    });

    test("should use now for elapsed time display when finishedAt is null", function() {
        setup(0, null, 2);
        expect(toHoursMinutesSeconds).toHaveBeenCalledWith(2);
    });

    test("should use finishedAt for elapsed time display", function() {
        setup(0, 1, 2);
        expect(toHoursMinutesSeconds).toHaveBeenCalledWith(1);
    });

    test("should update timer message when setInterval callback is executed", function() {
        setIntervalSpy.and.callFake(function(callback, time): void {
            expect(time).toBe(100);
            nowSpy.and.returnValue(200);
            toHoursMinutesSeconds.and.returnValue("CHANGED");
            callback();
        });

        setup(0, null, 2);

        expect(toHoursMinutesSeconds).toHaveBeenCalledTimes(2);
        expect(toHoursMinutesSeconds.calls.first().args).toEqual([2]);
        expect(toHoursMinutesSeconds.calls.mostRecent().args).toEqual([200]);
        expect(wrapper.find(`.${style.timer}`).text()).toContain("CHANGED");
    });
});
