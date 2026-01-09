import {Injectable} from '@angular/core';
import {MatchUp} from '../model/matchUp';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  matchUpList: MatchUp[] = [];
}
