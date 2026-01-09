import {Component, inject, Input} from '@angular/core';
import {MatchUp} from '../../model/matchUp';
import {GameManagerService} from '../../service/game-manager-service';
import {RoundStatus} from '../../model/round';
import {Player, PlayerStatus, Uuid} from '../../model/player';

@Component({
  selector: 'app-match-up-table',
  imports: [],
  templateUrl: './match-up-table.html',
  styleUrl: './match-up-table.css',
})
export class MatchUpTable {

  protected readonly RoundStatus = RoundStatus;
  gameManagerService = inject(GameManagerService)
  @Input() round: number = -1
  @Input() roundStatus: RoundStatus = RoundStatus.WAITING_TO_START;
  @Input() matchUpList: MatchUp[] = []

  get matchUpSize(): number {
    return this.gameManagerService.getMatchUpSize();
  }

  get canGenerateMatchUp(): boolean {
    return this.gameManagerService.canGenerateMatchUp();
  }


  startNextRound(): void {
    this.gameManagerService.startNextRound();
  }



  finishRound(): void {
    this.gameManagerService.markRoundAsFinished(this.round - 1);
  }

  processMatchResult( wonPlayerId: Uuid, matchUp: MatchUp): void {
    matchUp.players.forEach((player: Player) => {
      if (wonPlayerId === player.id) {
        player.state = PlayerStatus.WON
      } else {
        player.state = PlayerStatus.LOST
      }
    })
  }

  resetPlayers(playerList: Player[]): void {
    playerList.forEach((player: Player) => {
      player.state = PlayerStatus.NONE;
    });
  }

  tiePlayers(playerList: Player[]) {
    playerList.forEach((player: Player) => {
      player.state = PlayerStatus.TIE
    })
  }

  validatePlayers(): boolean {
    return this.matchUpList.every((matchUp: MatchUp) => {
      return matchUp.players.every(( player: Player) => { return player.state !== PlayerStatus.NONE})
    })
  }


}
