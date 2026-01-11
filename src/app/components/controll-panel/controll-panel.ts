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

  get amountOfMatches(): number {
    return this.gameManagerService.getAmountOfMatches()
  }

  get gameHasStarted(): boolean {
      return this.gameManagerService.gameHasStarted();
  }

  setAmountOfMatches(number:number){
    this.gameManagerService.setAmountOfMatches(number);
  }

  toggleRoundAmountInput() {
    this.calculateAmountOfMatches = !this.calculateAmountOfMatches;
    this.gameManagerService.toggleShouldCalculateAmountOfMatches();
  }

  protected readonly parseInt = parseInt;
}
