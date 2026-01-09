import { Component } from '@angular/core';
import {Player} from './model/player';
import {MainView} from './components/main-view/main-view';

@Component({
  selector: 'app-root',
  imports: [MainView],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  playerList: Player[] = [];

}
