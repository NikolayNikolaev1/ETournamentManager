import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from 'app/components/pages/auth/login/login.component';
import { RegisterComponent } from 'app/components/pages/auth/register/register.component';
import { HomeComponent } from 'app/components/pages/home/home.component';
import { NotFoundComponent } from 'app/components/pages/not-found/not-found.component';
import { PlayerProfileComponent } from 'app/components/pages/player-profile/player-profile.component';
import { TeamCreateComponent } from 'app/components/pages/team/team-create/team-create.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: PlayerProfileComponent,
  },
  {
    path: 'team/create',
    component: TeamCreateComponent,
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
