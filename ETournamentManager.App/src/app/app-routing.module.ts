import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from 'app/components/pages/home/home.component';
import { NotFoundComponent } from 'app/components/pages/not-found/not-found.component';
import { ProfileComponent } from 'app/components/pages/profile/profile.component';
import { TeamDetailsComponent } from 'app/components/pages/team/team-details/team-details.component';
import { TournamentDetailsComponent } from 'app/components/pages/tournament/tournament-details/tournament-details.component';

import { TeamTableComponent } from './components/pages/team/team-table/team-table.component';
import { TournamentTableComponent } from './components/pages/tournament/tournament-table/tournament-table.component';
import { UserTableComponent } from './components/dialogs/user-table/user-table.component';
import { adminGuard } from './guards/admin.guard';
import {
  authGuard,
  teamDetailsGuard,
  teamTableGuard,
  tournamentDetailsGuard,
  tournamentTableGuard,
} from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'tournament/:id',
    component: TournamentDetailsComponent,
    canActivate: [tournamentDetailsGuard],
  },
  {
    path: 'tournaments',
    component: TournamentTableComponent,
    canActivate: [tournamentTableGuard],
  },
  {
    path: 'team/:id',
    component: TeamDetailsComponent,
    pathMatch: 'full',
    canActivate: [teamDetailsGuard],
  },
  {
    path: 'teams',
    component: TeamTableComponent,
    pathMatch: 'full',
    canActivate: [teamTableGuard],
  },
  {
    path: 'users',
    component: UserTableComponent,
    pathMatch: 'full',
    canActivate: [authGuard, adminGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
