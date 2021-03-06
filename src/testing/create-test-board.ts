import { Square } from "../minesweeper/types/square";
import { createBoard } from "../minesweeper/functions/create-board";

/**
 * this will be used in tests to simplify creating and visualizing a board.
 * @param mines 1 will produce a mine in the position, and 0 will not
 */
export function createTestBoard(mines: (0 | 1)[][]): Square[][] {
    const flattened = mines.reduce((it, row) => [...it, ...row], []);
    const randomNumbers = flattened.map(mine => (mine ? 0 : 0.9));
    spyOn(Math, "random").and.returnValues(...randomNumbers);

    const height = mines.length;
    const width = mines[0].length;
    return createBoard(height, width, 2);
}
