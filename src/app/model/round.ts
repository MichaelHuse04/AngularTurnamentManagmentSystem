import {MatchUp} from './matchUp';


export class Round {
  matchUpList: MatchUp[];
  roundId: number;
  status: RoundStatus = RoundStatus.WAITING_TO_START

  constructor(matchUpList: MatchUp[], roundId: number) {
    this.matchUpList = matchUpList;
    this.roundId = roundId;
  }
}

export enum RoundStatus {
  WAITING_TO_START = "waitingToStart",
  PAUSED = "paused",
  RUNNING= "running",
  FINISHED = "finished",
}
