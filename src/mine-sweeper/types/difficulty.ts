export type DifficultyName = "EASY" | "NORMAL" | "HARD";

export interface Difficulty {
    readonly name: DifficultyName;
    readonly height: number;
    readonly width: number;
    readonly mineRatio: number;
}

export const EASY: Difficulty = {
    name: "EASY",
    height: 10,
    width: 10,
    mineRatio: 8
};

export const NORMAL: Difficulty = {
    name: "NORMAL",
    height: 15,
    width: 25,
    mineRatio: 8
};

export const HARD: Difficulty = {
    name: "HARD",
    height: 25,
    width: 50,
    mineRatio: 8
};
