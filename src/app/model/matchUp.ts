import {Player} from './player';
import { v4 as uuid } from 'uuid';

export class MatchUp {
  players: Player[]
  status: MatchStatus = MatchStatus.WAITING_TO_START
  id: Uuid

  constructor(players: Player[]) {
    this.players = players;
    this.id = uuid()
  }
}

export type Uuid = String

export enum MatchStatus {
  WAITING_TO_START = "waitingToStart",
  PAUSED = "paused",
  RUNNING = "running",
  FINISHED = "finished",
}
