import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from 'app/components/pages/login/login.component';
import { PlayerProfileComponent } from 'app/components/pages/player-profile/player-profile.component';
import { NotFoundComponent } from 'app/components/pages/not-found/not-found.component';
import { RegisterComponent } from 'app/components/pages/register/register.component';

const routes: Routes = [
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
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
