import Position from "./position";
import Square from "./square/square";
import { GameStatus } from "./game";

function realPosition({ x, y }: Position, boardSize: number): boolean {
    return x >= 0 && y >= 0 && x < boardSize && y < boardSize;
}

function getAdjacentPositions(
    { x, y }: Position,
    boardSize: number
): Position[] {
    return [
        // row above
        { x: x - 1, y: y - 1 },
        { x, y: y - 1 },
        { x: x + 1, y: y - 1 },
        // same row
        { x: x - 1, y },
        { x: x + 1, y },
        // row below
        { x: x - 1, y: y + 1 },
        { x, y: y + 1 },
        { x: x + 1, y: y + 1 }
    ].filter(position => realPosition(position, boardSize));
}

function getAdjacentSquares(position: Position, squares: Square[][]): Square[] {
    return getAdjacentPositions(position, squares.length).map(
        ({ x, y }) => squares[y][x]
    );
}

function getAdjacentSquaresToReveal(
    position: Position,
    squares: Square[][]
): Square[] {
    return getAdjacentSquares(position, squares).filter(square =>
        square.mine ? false : !square.revealed
    );
}

function revealPosition(position: Position, squares: Square[][]): Square[][] {
    return squares.map((row, y) =>
        row.map((square, x) => ({
            ...square,
            revealed: (position.x === x && position.y === y) || square.revealed
        }))
    );
}

export function reveal(position: Position, squares: Square[][]): Square[][] {
    const positionRevealed = revealPosition(position, squares);
    const square = positionRevealed[position.y][position.x];
    const shouldRevealAdjacent = !square.mine && square.adjacentMines === 0;
    if (shouldRevealAdjacent) {
        return getAdjacentSquaresToReveal(position, positionRevealed).reduce(
            (accumulator, { position }) => reveal(position, accumulator),
            positionRevealed
        );
    } else {
        return positionRevealed;
    }
}

export function getStatus(squares: Square[][]): GameStatus {
    const mineRevealed = squares.find(row =>
        row.find(square => square.revealed && square.mine)
    );

    if (mineRevealed) {
        return "FAIL";
    }

    const nonMineRevealed = squares.find(row =>
        row.find(square => !square.revealed && !square.mine)
    );
    return nonMineRevealed ? "PLAY" : "WIN";
}

export function revealMines(squares: Square[][]): Square[][] {
    return squares.map(row =>
        row.map(square => ({
            ...square,
            revealed: square.mine ? true : square.revealed
        }))
    );
}

function getAdjacentMines(position: Position, squares: Square[][]): number {
    return getAdjacentSquares(position, squares).reduce(
        (adjacentMines, { mine }) => (mine ? adjacentMines + 1 : adjacentMines),
        0
    );
}

function createEmptyBoard(size: number): Square[][] {
    return new Array<Square[]>(size).fill(
        new Array<Square>(size).fill({
            position: { x: 0, y: 0 },
            revealed: false,
            mine: false,
            adjacentMines: 0
        })
    );
}

function setPositions(emptyBoard: Square[][]): Square[][] {
    return emptyBoard.map((row, y) =>
        row.map((square, x) => ({
            ...square,
            position: { x, y }
        }))
    );
}

function plantMines(emptyBoard: Square[][], mineRatio: number): Square[][] {
    return emptyBoard.map((row, y) =>
        row.map((square, x) => ({
            ...square,
            position: { x, y },
            mine: Math.floor(Math.random() * mineRatio) === 0
        }))
    );
}

function markAdjacentMines(minedBoard: Square[][]): Square[][] {
    return minedBoard.map(row =>
        row.map(square => ({
            ...square,
            adjacentMines: getAdjacentMines(square.position, minedBoard)
        }))
    );
}

export function createBoard(size: number, mineRatio: number): Square[][] {
    const emptyBoard = createEmptyBoard(size);
    const emptyBoardWithPositions = setPositions(emptyBoard);
    const minedBoard = plantMines(emptyBoardWithPositions, mineRatio);
    return markAdjacentMines(minedBoard);
}
