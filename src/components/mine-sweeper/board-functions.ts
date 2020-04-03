import Position from "./position";
import Square from "./square/square";
import { GameStatus } from "./game";

export function realPosition(
    { x, y }: Position,
    width: number,
    height: number
): boolean {
    return x >= 0 && y >= 0 && x < width && y < height;
}

function getAdjacentPositions(
    { x, y }: Position,
    width: number,
    height: number
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
    ].filter(position => realPosition(position, width, height));
}

function getAdjacentSquares(position: Position, squares: Square[][]): Square[] {
    return getAdjacentPositions(
        position,
        squares[0].length,
        squares.length
    ).map(({ x, y }) => squares[y][x]);
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

function getFirstBlankSquareWithAdjacentToReveal(
    revealed: Square[],
    squares: Square[][]
): Position | undefined {
    const square = revealed.find(
        square =>
            square.revealed &&
            square.adjacentMines === 0 &&
            getAdjacentSquaresToReveal(square.position, squares).length > 0
    );
    return square && square.position;
}

function getPositionToReveal(
    revealed: Square[],
    squares: Square[][]
): Position | undefined {
    const position = getFirstBlankSquareWithAdjacentToReveal(revealed, squares);
    return position
        ? getAdjacentSquaresToReveal(position, squares)[0].position
        : undefined;
}

export function revealLoop(
    position: Position | undefined,
    squares: Square[][]
): Square[][] {
    let revealed: Square[] = [];
    while (position) {
        squares = revealPosition(position, squares);
        if (getAdjacentSquaresToReveal(position, squares).length > 0) {
            revealed = [...revealed, squares[position.y][position.x]];
        }
        position = getPositionToReveal(revealed, squares);
    }
    return squares;
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
        squares[position.y][position.x].mine ? 1 : 0
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
