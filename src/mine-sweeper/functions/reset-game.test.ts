import * as createBoardObj from "./create-board";
import Spy = jasmine.Spy;
import { resetGame } from "./reset-game";

describe("resetGame", function() {
    let createBoard: Spy;

    beforeEach(function() {
        createBoard = spyOn(createBoardObj, "createBoard");
        createBoard.and.returnValue([]);
    });

    test("should pass params through to create board", function() {
        const params: [number, number, number] = [1, 2, 3];
        resetGame(...params);
        expect(createBoard).toHaveBeenCalledWith(...params);
    });

    test("should reset game", function() {
        const game = resetGame(1, 2, 3);
        expect(game).toEqual({
            board: [],
            status: "START",
            flagging: false,
            startedAt: null,
            finishedAt: null
        });
    });
});
