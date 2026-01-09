import {Round} from './round';

export class Game{
  roundList: Round[];
  status: GameStatus = GameStatus.WAITING_TO_START;

  constructor(roundList: Round[]) {
    this.roundList = roundList;
  }
}

export enum GameStatus {
  WAITING_TO_START = "waitingToStart",
  PAUSED = "paused",
  RUNNING= "running",
  FINISHED = "finished",
}
