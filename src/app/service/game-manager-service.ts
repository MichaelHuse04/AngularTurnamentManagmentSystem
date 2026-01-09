import {Injectable} from '@angular/core';
import {Game, GameStatus} from '../model/game';
import {MatchUp} from '../model/matchUp';
import {Player, PlayerStatus} from '../model/player';
import {Round, RoundStatus} from '../model/round';


@Injectable({
  providedIn: 'root',
})
export class GameManagerService {

  private game: Game = new Game([]);
  private playerList: Player[] = [];
  private matchUpSize: number = 2;
  private amountOfMatches: number = 2;
  private shouldCalculateAmountOfMatches: boolean = false;
  private currentRound: number = 0;

  gameHasStarted() {
    return this.game.status !== GameStatus.WAITING_TO_START;
  }

  startGame(): void {

    for (let i = 0; i < this.amountOfMatches; i++) {
      this.game.roundList.push(new Round([], i + 1))
    }
    this.currentRound = 1
    this.game.status = GameStatus.RUNNING
    this.game.roundList[0].status = RoundStatus.RUNNING
    this.generateMatchUp()
  }

  startNextRound(): void {
    this.processCurrentRoundRoundResult()
    this.game.roundList[this.currentRound - 1] = structuredClone(this.game.roundList[this.currentRound - 1]);
    this.currentRound++;
    this.game.roundList[this.currentRound - 1].status = RoundStatus.RUNNING;
    this.generateMatchUp()
  }

  private processCurrentRoundRoundResult(): void {
    this.game.roundList[this.currentRound - 1].matchUpList.forEach((matchUp: MatchUp) => {

      matchUp.players.forEach(player => {
        if (player.state === PlayerStatus.WON) {
          player.points.wins++;
        }
        else if (player.state === PlayerStatus.LOST) {
          player.points.loses++;
        }
        else if (player.state === PlayerStatus.TIE) {
          player.points.ties++;
        }
      })
    })
  }

  markRoundAsFinished(roundIndex: number): void {
    this.game.roundList[roundIndex].status = RoundStatus.FINISHED;
  }

  getAmountOfMatches(): number {
    return this.amountOfMatches
  }

  setAmountOfMatches(amountOfMatches: number) {
    this.amountOfMatches = amountOfMatches;
  }

  toggleShouldCalculateAmountOfMatches() {
    this.shouldCalculateAmountOfMatches = !this.shouldCalculateAmountOfMatches;
  }

  getRoundList(): Round[] {
    return this.game.roundList;
  }

  getMatchUpSize():number {
    return this.matchUpSize
  }

  sortPlayersByPoints() {
    this.playerList = this.playerList.sort(
      (a, b) => {
        if (b.points.wins === a.points.wins) {
          if (b.points.loses === a.points.loses) {
            return b.points.loses - a.points.loses
          }
          return b.points.ties - a.points.ties
        }
        return b.points.wins - a.points.wins
      });
  }

  canGenerateMatchUp(): boolean {
    return !!this.playerList.length
  }

  private generateMatchUp() {
    this.playerList.forEach(player => {
      player.state = PlayerStatus.NONE;
    })

    this.sortPlayersByPoints()
    const chunkSize = this.matchUpSize;
    for (let i = 0; i < this.playerList.length; i += chunkSize) {
      const chunk = this.playerList.slice(i, i + chunkSize);
      // do whatever
      console.log(chunk);
      this.addMatchUp(this.currentRound - 1,(new MatchUp(chunk)));
    }
  }

  // clearMatchUp(roundIndex:number, matchUpIndex:number) {
  //   this.game.roundList[roundIndex].matchUpList[matchUpIndex] = new MatchUp([]);
  // }

  addMatchUp(roundIndex: number, matchUp: MatchUp) {
    this.game.roundList[roundIndex].matchUpList.push(matchUp);
  }

  getAllMatchUpForRound(roundIndex: number): MatchUp[] {
    return this.game.roundList[roundIndex].matchUpList;
  }

  addPlayer(player: Player) {
    this.playerList.push(player);
  }
  getPlayers(): Player[] {
    return this.playerList;
  }
}
