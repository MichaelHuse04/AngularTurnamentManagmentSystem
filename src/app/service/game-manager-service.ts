import {Injectable} from '@angular/core';
import {Game, GameStatus} from '../model/game';
import {MatchUp} from '../model/matchUp';
import {Player, PlayerStatus} from '../model/player';
import {Round, RoundStatus} from '../model/round';

@Injectable({
  providedIn: 'root',
})
export class GameManagerService {

  currentRound: number = 0;
  private game: Game = new Game([]);
  private playerList: Player[] = [];
  private matchUpSize: number = 2;
  private amountOfMatches: number = 2;
  private shouldCalculateAmountOfMatches: boolean = false;

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

  backToRound(round: number): void {
    for (let i = this.currentRound; i > round; i--) {
      this.revertRoundResult(i - 1);
      this.clearRound(i - 1);
    }
    this.currentRound = round;
    this.game.roundList[this.currentRound - 1].status = RoundStatus.RUNNING;
  }

  startNextRound(): void {

    this.processCurrentRoundRoundResult();
    this.game.roundList[this.currentRound - 1] = structuredClone(this.game.roundList[this.currentRound - 1]);
    this.game.roundList[this.currentRound - 1].status = RoundStatus.FINISHED;
    this.currentRound++;
    this.game.roundList[this.currentRound - 1].status = RoundStatus.RUNNING;
    this.generateMatchUp();
  }

  finishGame(): void {
    this.processCurrentRoundRoundResult();
    this.game.roundList[this.currentRound - 1] = structuredClone(this.game.roundList[this.currentRound - 1]);
    this.game.roundList[this.currentRound - 1].status = RoundStatus.FINISHED;
    this.game.status = GameStatus.FINISHED;
  }

  isLastRound(round: number): boolean {
    return this.game.roundList.length === round;
  }

  setRoundStatus(roundIndex: number, status: RoundStatus): void {
    this.game.roundList[roundIndex].status = status;
  }

  getAmountOfMatches(): number {
    return this.amountOfMatches
  }

  setAmountOfMatchUps(amountOfMatches: number) {
    this.amountOfMatches = amountOfMatches;
  }

  setPlayerPerMatchUp(playerPerMatchUp: number) {
    this.matchUpSize = playerPerMatchUp;
  }

  toggleShouldCalculateAmountOfMatches() {
    this.shouldCalculateAmountOfMatches = !this.shouldCalculateAmountOfMatches;
  }

  getRoundList(): Round[] {
    return this.game.roundList;
  }

  getMatchUpSize(): number {
    return this.matchUpSize
  }

  sortPlayersByPoints() {
    this.playerList = this.playerList.sort(
      (a, b) => {

        const pointsForAWin = 3
        const pointsForATie = 1

        let pointsA = a.points.wins * pointsForAWin + a.points.ties * pointsForATie;
        let pointsB = b.points.wins * pointsForAWin + b.points.ties * pointsForATie;

        return pointsB - pointsA
      });
  }

  canGenerateMatchUp(): boolean {
    return !!this.playerList.length
  }

  clearRound(roundIndex: number): void {
    this.game.roundList[roundIndex].status = RoundStatus.WAITING_TO_START;
    this.game.roundList[roundIndex].matchUpList = [];
  }

  addMatchUp(roundIndex: number, matchUp: MatchUp) {
    this.game.roundList[roundIndex].matchUpList.push(matchUp);
  }

  getAllMatchUpForRound(roundIndex: number): MatchUp[] {
    return this.game.roundList[roundIndex].matchUpList;
  }

  addPlayer(player: Player) {
    this.playerList.push(player);
  }

  // clearMatchUp(roundIndex:number, matchUpIndex:number) {
  //   this.game.roundList[roundIndex].matchUpList[matchUpIndex] = new MatchUp([]);
  // }

  getPlayers(): Player[] {
    return this.playerList;
  }

  private processCurrentRoundRoundResult(): void {
    this.game.roundList[this.currentRound - 1].matchUpList.forEach((matchUp: MatchUp) => {
      matchUp.players.forEach(playerInMatchUpList => {
        this.playerList.forEach(playerInPlayerList => {
          if (playerInPlayerList.id === playerInMatchUpList.id) {
            if (playerInMatchUpList.state === PlayerStatus.WON) {
              playerInPlayerList.points.wins++;
            } else if (playerInMatchUpList.state === PlayerStatus.LOST) {
              playerInPlayerList.points.loses++;
            } else if (playerInMatchUpList.state === PlayerStatus.TIE) {
              playerInPlayerList.points.ties++;
            } else if (playerInMatchUpList.state === PlayerStatus.NONE) {
              new Error("Cannot process round result if playerStatus is NONE");
            }
          }
        });
      });
    });

  }

  private revertRoundResult(roundIndex: number): void {
    this.game.roundList[roundIndex - 1].matchUpList.forEach((matchUp: MatchUp) => {
      matchUp.players.forEach(playerInMatchUpList => {
        this.playerList.forEach(playerInPlayerList => {
          if (playerInPlayerList.id === playerInMatchUpList.id) {
            if (playerInMatchUpList.state === PlayerStatus.WON) {
              playerInMatchUpList.points.wins--;
              playerInPlayerList.points.wins--;
            } else if (playerInMatchUpList.state === PlayerStatus.LOST) {
              playerInMatchUpList.points.loses--;
              playerInPlayerList.points.loses--;
            } else if (playerInMatchUpList.state === PlayerStatus.TIE) {
              playerInMatchUpList.points.ties--;
              playerInPlayerList.points.ties--;
            } else if (playerInMatchUpList.state === PlayerStatus.NONE) {
              new Error("Cannot revert round result if playerStatus is NONE");
            }
          }
        });
      });
    });
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
      this.addMatchUp(this.currentRound - 1, (new MatchUp(chunk)));
    }
  }
}
