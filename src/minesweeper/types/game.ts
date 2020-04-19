import { BoardWithStatus } from "./board-with-status";

export interface Game extends BoardWithStatus {
    flagging: boolean;
    startedAt: number | null;
    finishedAt: number | null;
}
