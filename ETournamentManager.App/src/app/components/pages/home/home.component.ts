import { Component, OnInit } from '@angular/core';

import { TournamentRounds } from 'app/models/tournament.model';
import { ApiService } from 'app/services/api.service';
import { SERVER_ROUTES } from 'app/utils/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  startedTournaments: TournamentRounds[] = [];
  currentTournamnetIndex: number = 0;

  constructor(private apiServie: ApiService) {}

  ngOnInit(): void {
    this.apiServie
      .request<TournamentRounds[]>({ url: SERVER_ROUTES.TOURNAMENT.GET_ALL_ROUNDS, method: 'get' })
      .subscribe((response) => (this.startedTournaments = response));
  }

  changeTournament(forward: boolean) {
    if (
      (forward && this.currentTournamnetIndex === this.startedTournaments.length - 1) ||
      (!forward && this.currentTournamnetIndex === 0)
    ) {
      console.log({ tester: 'sad' });
      return;
    }

    forward ? this.currentTournamnetIndex++ : this.currentTournamnetIndex--;
  }
}
