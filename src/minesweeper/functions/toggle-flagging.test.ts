import { toggleFlagging } from "./toggle-flagging";
import { Game } from "../types/game";
import { Square } from "../types/square";

describe("toggleFlagging", function() {
    function setup(flagging: boolean): Game {
        const game = toggleFlagging({
            board: [[]] as Square[][],
            difficultyName: "EASY",
            status: "PLAY",
            startedAt: 1,
            finishedAt: 2,
            flagging
        });
        const { board, status, finishedAt, startedAt } = game;
        expect(board).toEqual([[]]);
        expect(status).toEqual("PLAY");
        expect(startedAt).toEqual(1);
        expect(finishedAt).toEqual(2);
        return game;
    }

    test("should toggle flagging true to false", function() {
        const { flagging } = setup(true);
        expect(flagging).toBeFalsy();
    });

    test("should toggle flagging false to true", function() {
        const { flagging } = setup(false);
        expect(flagging).toBeTruthy();
    });
});
