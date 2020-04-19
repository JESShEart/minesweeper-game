import { Square } from "../types/square";

export function revealMines(squares: Square[][]): Square[][] {
    return squares.map(row =>
        row.map(square => ({
            ...square,
            revealed: square.mine ? true : square.revealed
        }))
    );
}
