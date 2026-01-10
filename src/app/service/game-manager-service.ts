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
    currentRound: number = 0;

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
        this.generateMatchUpFromPlayerList()
    }

    backToRound(round: number): void {
        for (let i = this.currentRound; i > round; i--) {
            this.clearRound(i - 1);
        }
        this.currentRound = round;
        this.game.roundList[this.currentRound - 1].status = RoundStatus.RUNNING;
        this.revertRoundResult(this.currentRound - 1);
    }

    startNextRound(): void {
        this.processCurrentRoundRoundResult();
        this.game.roundList[this.currentRound - 1] = structuredClone(this.game.roundList[this.currentRound - 1]);
        this.game.roundList[this.currentRound - 1].status = RoundStatus.FINISHED;
        this.currentRound++;
        this.game.roundList[this.currentRound - 1].status = RoundStatus.RUNNING;
        this.generateMatchUpFromMatchUpList();
    }

    private getNextRound(): Round {
        return this.game.roundList[this.currentRound];
    }

    private processCurrentRoundRoundResult(): void {
        this.game.roundList[this.currentRound - 1].matchUpList.forEach((matchUp: MatchUp) => {

            matchUp.players.forEach(player => {
                if (player.state === PlayerStatus.WON) {
                    player.points.wins++;
                } else if (player.state === PlayerStatus.LOST) {
                    player.points.loses++;
                } else if (player.state === PlayerStatus.TIE) {
                    player.points.ties++;
                }else if (player.state === PlayerStatus.NONE) {
                    new Error("Cannot process round result if playerStatus is NONE");
                }
            })
        })
    }

    private revertRoundResult(roundIndex: number): void {
        this.game.roundList[roundIndex - 1].matchUpList.forEach((matchUp: MatchUp) => {

            matchUp.players.forEach(player => {
                if (player.state === PlayerStatus.WON) {
                    player.points.wins--;
                } else if (player.state === PlayerStatus.LOST) {
                    player.points.loses--;
                } else if (player.state === PlayerStatus.TIE) {
                    player.points.ties--;
                }else if (player.state === PlayerStatus.NONE) {
                    new Error("Cannot revert round result if playerStatus is NONE");
                }
            })
        })
    }

    setRoundStatus(roundIndex: number, status: RoundStatus): void {
        this.game.roundList[roundIndex].status = status;
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

    getMatchUpSize(): number {
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

    private generateMatchUpFromPlayerList() {
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

    private generateMatchUpFromMatchUpList() {

        let playerList: Player[] = this.game.roundList[this.currentRound - 2].matchUpList
            .map((matchUp: MatchUp) => matchUp.players)
            .flat();

        playerList.forEach((player: Player) => {
            player.state = PlayerStatus.NONE;
        })

        playerList = playerList.sort(
            (a, b) => {
                if (b.points.wins === a.points.wins) {
                    if (b.points.loses === a.points.loses) {
                        return b.points.loses - a.points.loses
                    }
                    return b.points.ties - a.points.ties
                }
                return b.points.wins - a.points.wins
            });

        const chunkSize = this.matchUpSize;
        for (let i = 0; i < playerList.length; i += chunkSize) {
            const chunk = playerList.slice(i, i + chunkSize);
            // do whatever
            console.log(chunk);
            this.addMatchUp(this.currentRound - 1, (new MatchUp(chunk)));
        }
    }

    clearRound(roundIndex: number): void {
        this.game.roundList[roundIndex].status = RoundStatus.WAITING_TO_START;
        this.game.roundList[roundIndex].matchUpList = [];
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
