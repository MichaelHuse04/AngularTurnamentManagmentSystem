import {Component, inject, Input} from '@angular/core';
import {MatchUp} from '../../../model/matchUp';
import {GameManagerService} from '../../../service/game-manager-service';

@Component({
    selector: 'app-finished-match-up-table',
    imports: [],
    templateUrl: './finished-match-up-table.html',
    styleUrl: './finished-match-up-table.css',
})
export class FinishedMatchUpTable {

    @Input() round: number = -1;
    @Input() matchUpList!: MatchUp[];
    @Input() canBeEdited!: boolean;
    gameManagerService = inject(GameManagerService);

    get matchUpSize(): number {
        return this.gameManagerService.getMatchUpSize();
    }

    backToThisRound(): void {
        this.gameManagerService.backToRound(this.round)
    }

}
