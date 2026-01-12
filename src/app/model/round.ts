import {MatchUp} from './matchUp';

export class Round {
  matchUpList: MatchUp[];
  id: number;
  status: RoundStatus = RoundStatus.WAITING_TO_START

  constructor(matchUpList: MatchUp[], roundId: number) {
    this.matchUpList = matchUpList;
    this.id = roundId;
  }
}

export enum RoundStatus {
  WAITING_TO_START = "waitingToStart",
  PAUSED = "paused",
  RUNNING = "running",
  FINISHED = "finished",
}
