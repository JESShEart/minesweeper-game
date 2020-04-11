import { BoardWithStatus } from "./board-with-status";

export interface Game extends BoardWithStatus {
    startedAt: number | null;
    finishedAt: number | null;
}
