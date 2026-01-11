import {Component, inject, Input} from '@angular/core';
import {GameManagerService} from '../../service/game-manager-service';

@Component({
    selector: 'app-controll-panel',
    imports: [],
    templateUrl: './controll-panel.html',
    styleUrl: './controll-panel.css',
})
export class ControllPanel {

    @Input() isDisabled = false;
    gameManagerService = inject(GameManagerService);
    calculateAmountOfMatches = false;


    get amountOfPlayers(): number {
        return this.gameManagerService.getPlayers().length;
    }

    get amountOfMatches(): number {
        return this.gameManagerService.getAmountOfMatches()
    }

    get amountOfPlayersPerRound() {
        return this.gameManagerService.getMatchUpSize();
    }

    setAmountOfMatches(value: number) {
        this.gameManagerService.setAmountOfMatchUps(value);
    }

    setPlayerPerMatchUp(value: number) {
        this.gameManagerService.setPlayerPerMatchUp(value);
    }

    toggleRoundAmountInput() {
        this.calculateAmountOfMatches = !this.calculateAmountOfMatches;
        this.gameManagerService.toggleShouldCalculateAmountOfMatches();
    }

    protected readonly parseInt = parseInt;
}
