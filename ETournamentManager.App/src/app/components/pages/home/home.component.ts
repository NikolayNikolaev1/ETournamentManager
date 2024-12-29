import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DialogService } from '@ngneat/dialog';

import { HOME_PANEL_CONFIG } from 'app/components/pages/home/home.config';
import { TournamentRounds } from 'app/models/tournament.model';
import UserProfile from 'app/models/user-profile.model';
import { ApiService } from 'app/services/api.service';
import { AuthService } from 'app/services/auth.service';
import { GLOBAL_CONSTANTS, SERVER_ROUTES } from 'app/utils/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  clientRoutes = GLOBAL_CONSTANTS.CLIENT_ROUTES;
  homePanelConfig = HOME_PANEL_CONFIG;
  startedTournaments: TournamentRounds[] = [];
  currentTournamnetIndex: number = 0;
  opacity: number = 0;
  opacityUp: boolean = true;
  liveInterval: NodeJS.Timeout | null = null;
  tournamentLoading: boolean = false;
  currentUser: UserProfile | null = null;

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private apiServie: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getActiveTournaments();
    this.authService.currentUser$.subscribe((profile) => (this.currentUser = profile));
  }

  ngOnDestroy() {
    if (this.liveInterval !== null) {
      clearInterval(this.liveInterval);
    }
  }

  changeTournament(forward: boolean) {
    if (
      (forward && this.currentTournamnetIndex === this.startedTournaments.length - 1) ||
      (!forward && this.currentTournamnetIndex === 0)
    ) {
      return;
    }

    forward ? this.currentTournamnetIndex++ : this.currentTournamnetIndex--;
  }

  onHomePanelClick(route: string, dialogComponent: any) {
    if (dialogComponent === undefined) {
      this.router.navigate([route]);
    } else {
      this.dialogService.open(dialogComponent);
    }
  }

  private getActiveTournaments() {
    this.tournamentLoading = true;
    this.apiServie
      .request<TournamentRounds[]>({ url: SERVER_ROUTES.TOURNAMENT.GET_ALL_ROUNDS, method: 'get' })
      .subscribe((response) => {
        this.startedTournaments = response;

        if (this.startedTournaments.length > 0) {
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

        this.tournamentLoading = false;
      });
  }
}
