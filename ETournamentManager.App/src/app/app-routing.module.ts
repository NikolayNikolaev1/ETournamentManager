import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from 'app/components/pages/auth/login/login.component';
import { RegisterComponent } from 'app/components/pages/auth/register/register.component';
import { GameCreateComponent } from 'app/components/pages/game/game-create/game-create.component';
import { HomeComponent } from 'app/components/pages/home/home.component';
import { NotFoundComponent } from 'app/components/pages/not-found/not-found.component';
import { PlayerProfileComponent } from 'app/components/pages/player-profile/player-profile.component';
import { TeamCreateComponent } from 'app/components/pages/team/team-create/team-create.component';
import { TeamDetailsComponent } from 'app/components/pages/team/team-details/team-details.component';
import { TournamentCreateComponent } from 'app/components/pages/tournament/tournament-create/tournament-create.component';
import { TournamentDetailsComponent } from 'app/components/pages/tournament/tournament-details/tournament-details.component';
import { CLIENT_ROUTES } from 'app/utils/constants';
import { TournamentTableComponent } from './components/pages/tournament/tournament-table/tournament-table.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'profile',
    component: PlayerProfileComponent,
  },
  {
    path: 'tournament/:id',
    component: TournamentDetailsComponent,
  },
  {
    path: 'tournaments',
    component: TournamentTableComponent,
  },
  {
    path: 'team/:id',
    component: TeamDetailsComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
