import { revealAction } from "./reveal-action";
import { StatsDispatch } from "../../stats/stats-reducer";
import { Square } from "../types/square";
import { Game } from "../types/game";
import * as revealObj from "../functions/reveal";
import * as logResultActionObj from "../../stats/actions/log-result-action";
import Spy = jasmine.Spy;

describe("revealAction", function() {
    let statsDispatch: StatsDispatch;
    let logResultAction: Spy;

    function setup(
        finishedAt: number | null,
        updatedFinishedAt: number | null
    ): void {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        statsDispatch = (): void => {};
        logResultAction = spyOn(logResultActionObj, "logResultAction");
        spyOn(revealObj, "reveal").and.returnValue({
            finishedAt: updatedFinishedAt
        });
        const gameReducer = revealAction({} as Square, statsDispatch);
        gameReducer({ finishedAt } as Game);
    }

    test("should not dispatch logResultAction when not finished", function() {
        setup(null, null);
        expect(logResultAction).not.toHaveBeenCalled();
    });

    test("should dispatch logResultAction when just finished", function() {
        setup(null, 1);
        expect(logResultAction).toHaveBeenCalledWith({ finishedAt: 1 });
    });

    test("should not dispatch logResultAction when already finished", function() {
        setup(1, 2);
        expect(logResultAction).not.toHaveBeenCalled();
    });
});
