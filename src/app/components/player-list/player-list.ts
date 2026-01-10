import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Player} from '../../model/player';
import {GameManagerService} from '../../service/game-manager-service';

@Component({
    selector: 'app-player-list',
    imports: [],
    templateUrl: './player-list.html',
    styleUrl: './player-list.css',
})
export class PlayerList {

    @Output() public hidePlayerList = new EventEmitter();
    @Input() isDisabled = false;
    gameManagerService = inject(GameManagerService)



    get playerCount(): number {
        return this.gameManagerService.getPlayers().length;
    }

    get playerList() {
        return this.gameManagerService.getPlayers();
    }

    addPlayer(playerName: string) {
        if (playerName.trim()) {
            this.gameManagerService.addPlayer(new Player(playerName));
        }
    }

    addMockPlayer() {
        [
            "Liam", "Noah", "Oliver", "Elijah", "James",
            "William", "Benjamin", "Lucas", "Henry", "Alexander",
            "Mason", "Michael", "Ethan", "Daniel", "Jacob",
            "Logan", "Jackson", "Levi", "Sebastian", "Mateo",
            "Jack", "Owen", "Theodore", "Aiden", "Samuel",
            "Joseph", "John", "David", "Wyatt", "Matthew",
            "Luke", "Asher", "Carter", "Julian", "Grayson",
            "Leo", "Jayden", "Gabriel", "Isaac", "Lincoln",
            "Anthony", "Hudson", "Dylan", "Ezra", "Thomas",
            "Charles", "Christopher", "Jaxon", "Maverick", "Josiah"
        ].forEach((name) => {
            this.gameManagerService.addPlayer(new Player(name));
        });
    }

    removePlayer(index: number) {
        this.playerList.splice(index, 1);
    }
}
