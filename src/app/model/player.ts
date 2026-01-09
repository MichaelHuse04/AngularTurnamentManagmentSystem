import {v4 as uuid} from 'uuid';

export class Player {
  points: Points;
  name: string;
  state: PlayerStatus;
  id: Uuid
  opponents: Player[];

  constructor(name: string) {
    this.points = { wins: 0, loses: 0, ties: 0};
    this.name = name;
    this.state = PlayerStatus.NONE;
    this.id = uuid();
    this.opponents = [];
  }
}

export type Uuid = String

export type Points = {
  wins: number;
  loses: number;
  ties: number;
}

export enum PlayerStatus {
  NONE = "None",
  WON = "won",
  LOST = "lost",
  TIE = "tie",
}
