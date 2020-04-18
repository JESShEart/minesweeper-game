export type DifficultyName = "EASY" | "NORMAL" | "HARD";

export interface Difficulty {
    readonly name: DifficultyName;
    readonly displayName: string;
    readonly height: number;
    readonly width: number;
    readonly mineRatio: number;
}

export const EASY: Difficulty = {
    name: "EASY",
    displayName: "Easy",
    height: 10,
    width: 10,
    mineRatio: 8
};

export const NORMAL: Difficulty = {
    name: "NORMAL",
    displayName: "Normal",
    height: 15,
    width: 25,
    mineRatio: 8
};

export const HARD: Difficulty = {
    name: "HARD",
    displayName: "Hard",
    height: 25,
    width: 50,
    mineRatio: 8
};
