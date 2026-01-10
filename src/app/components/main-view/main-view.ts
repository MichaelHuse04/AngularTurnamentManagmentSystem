import {Component, inject} from '@angular/core';
import {PlayerList} from '../player-list/player-list';
import {MatchUpTable} from '../match-up-table/match-up-table';
import {ControllPanel} from '../controll-panel/controll-panel';
import {GameManagerService} from '../../service/game-manager-service';
import {Round, RoundStatus} from '../../model/round';
import {FinishedMatchUpTable} from '../match-up-table/finished-match-up-table/finished-match-up-table';

@Component({
    selector: 'app-main-view',
    imports: [
        PlayerList,
        MatchUpTable,
        ControllPanel,
        FinishedMatchUpTable
    ],
    templateUrl: './main-view.html',
    styleUrl: './main-view.css',
})
export class MainView {

    protected readonly RoundStatus = RoundStatus;
    gameManagerService = inject(GameManagerService);
    showPlayerList = true;

    startGame(): void {
        this.gameManagerService.startGame();
    }

    gameHasStarted() {
        return this.gameManagerService.gameHasStarted()
    }

    get roundList(): Round[] {
        return this.gameManagerService.getRoundList();
    }

    // get matchUps(): MatchUp[] {}

    // get matchUpCount(): number {
    //   return this.gameManagerService.getAllMatchUpForRound().length;
    // }

    constructor(gameManagerService: GameManagerService) {
        this.gameManagerService = gameManagerService;
    }

}
