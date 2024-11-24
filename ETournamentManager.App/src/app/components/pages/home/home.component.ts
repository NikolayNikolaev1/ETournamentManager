import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TournamentRounds } from 'app/models/tournament.model';
import { ApiService } from 'app/services/api.service';
import { SERVER_ROUTES } from 'app/utils/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  startedTournaments: TournamentRounds[] = [];
  currentTournamnetIndex: number = 0;
  opacity: number = 0;
  opacityUp: boolean = true;
  liveInterval: any;

  constructor(
    private router: Router,
    private apiServie: ApiService
  ) {}

  ngOnInit(): void {
    this.apiServie
      .request<TournamentRounds[]>({ url: SERVER_ROUTES.TOURNAMENT.GET_ALL_ROUNDS, method: 'get' })
      .subscribe((response) => (this.startedTournaments = response));

    this.liveInterval = setInterval(() => {
      if (this.opacityUp) {
        this.opacity++;
      } else {
        this.opacity--;
      }

      if (this.opacity === 9) {
        this.opacityUp = false;
      }

      if (this.opacity === 0) {
        this.opacityUp = true;
      }
    }, 100);
  }

  ngOnDestroy() {
    clearInterval(this.liveInterval);
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

  onTeamClick(id: string) {
    this.router.navigate([`team/${id}`]);
  }

  onTournamentClick() {
    this.router.navigate([`tournament/${this.startedTournaments[this.currentTournamnetIndex].id}`]);
  }
}
