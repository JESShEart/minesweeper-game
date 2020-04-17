import { createGame } from "./create-game";
import Spy = jasmine.Spy;
import * as GetStatus from "./get-status";
import * as RevealMines from "./reveal-mines";
import { Game } from "../types/game";
import { GameStatus } from "../types/game-status";

describe("createGame", function() {
    let game: Game;
    let revealMinesSpy: Spy;
    let getStatusSpy: Spy;

    function setup(getStatus: GameStatus): void {
        revealMinesSpy = spyOn(RevealMines, "revealMines").and.returnValue([]);
        getStatusSpy = spyOn(GetStatus, "getStatus").and.returnValues(
            getStatus
        );
        spyOn(Date, "now").and.returnValue(2);
        game = createGame({
            board: [],
            difficultyName: "NORMAL",
            status: "PLAY",
            flagging: false,
            startedAt: 1,
            finishedAt: null
        });
    }

    test("should reveal mines when the game is won", function() {
        setup("WIN");
        expect(game).toEqual({
            board: [],
            difficultyName: "NORMAL",
            status: "WIN",
            flagging: false,
            startedAt: 1,
            finishedAt: 2
        });
        expect(getStatusSpy).toHaveBeenCalled();
        expect(revealMinesSpy).toHaveBeenCalled();
    });

    test("should reveal mines when the game is lost", function() {
        setup("FAIL");
        expect(game).toEqual({
            board: [],
            difficultyName: "NORMAL",
            status: "FAIL",
            flagging: false,
            startedAt: 1,
            finishedAt: 2
        });
        expect(getStatusSpy).toHaveBeenCalled();
        expect(revealMinesSpy).toHaveBeenCalled();
    });

    test("should not reveal mines when the game is ongoing", function() {
        setup("PLAY");
        expect(game).toEqual({
            board: [],
            difficultyName: "NORMAL",
            status: "PLAY",
            flagging: false,
            startedAt: 1,
            finishedAt: null
        });
        expect(getStatusSpy).toHaveBeenCalled();
        expect(revealMinesSpy).not.toHaveBeenCalled();
    });
});
