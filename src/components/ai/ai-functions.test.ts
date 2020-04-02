import { generateKey, updateOutcome } from "./ai-functions";
import { createBoard } from "../mine-sweeper/board-functions";
import Square from "../mine-sweeper/square/square";

test("updateOutcome with success", () => {
    expect(
        updateOutcome(
            {
                successRate: 0,
                successes: 1,
                trials: 9
            },
            true
        )
    ).toEqual({
        successRate: 20,
        successes: 2,
        trials: 10
    });
});

test("updateOutcome with fail", () => {
    expect(
        updateOutcome(
            {
                successRate: 0,
                successes: 1,
                trials: 9
            },
            false
        )
    ).toEqual({
        successRate: 10,
        successes: 1,
        trials: 10
    });
});

function board(): Square[][] {
    return [
        [
            { revealed: true, adjacentMines: 0 },
            { revealed: true, adjacentMines: 1 },
            { revealed: false, adjacentMines: 0 }
        ],
        [
            { revealed: true, adjacentMines: 0 },
            { revealed: true, adjacentMines: 1 },
            { revealed: false, adjacentMines: 0 }
        ],
        [
            { revealed: true, adjacentMines: 0 },
            { revealed: true, adjacentMines: 1 },
            { revealed: false, adjacentMines: 0 }
        ]
    ] as Square[][];
}

test("generateKey (0,0)", () => {
    expect(generateKey({ x: 0, y: 0 }, board())).toEqual("----01-01");
});

test("generateKey (1,1)", () => {
    expect(generateKey({ x: 1, y: 1 }, board())).toEqual("01?01?01?");
});

test("generateKey (2,2)", () => {
    expect(generateKey({ x: 2, y: 2 }, board())).toEqual("1?-1?----");
});
