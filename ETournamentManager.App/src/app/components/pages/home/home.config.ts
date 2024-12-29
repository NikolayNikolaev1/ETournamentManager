import { Component } from '@angular/core';

import { GameCreateComponent } from 'app/components/dialogs/game-create/game-create.component';
import { LoginComponent } from 'app/components/dialogs/login/login.component';
import { RegisterComponent } from 'app/components/dialogs/register/register.component';
import { TeamManagementComponent } from 'app/components/dialogs/team-management/team-management.component';
import { TournamentManagementComponent } from 'app/components/pages/tournament/tournament-management/tournament-management.component';
import { CLIENT_ROUTES, USER_ROLES } from 'app/utils/constants';

type HomePanelItem = {
  title: string;
  buttonText: string;
  imageUrl: string;
  roles: string[];
  route?: string;
  dialogComponent?: any;
};

export const HOME_PANEL_CONFIG: HomePanelItem[] = [
  {
    title: 'Log in to your account',
    buttonText: 'Login',
    imageUrl: 'assets/images/home-panel-tournament-table.png',
    roles: [],
    dialogComponent: LoginComponent,
  },
  {
    title: 'Create a new account',
    buttonText: 'Register',
    imageUrl: 'assets/images/home-panel-tournament-table.png',
    roles: [],
    dialogComponent: RegisterComponent,
  },
  {
    title: 'Tournaments Table',
    buttonText: 'Show all tournaments',
    imageUrl: 'assets/images/home-panel-tournament-table.png',
    route: CLIENT_ROUTES.TOURNAMENT_TABLE,
    roles: [],
  },
  {
    title: 'Teams Table',
    buttonText: 'Show all teams',
    imageUrl: 'assets/images/home-panel-team-table.png',
    route: CLIENT_ROUTES.TEAM_TABLE,
    roles: [],
  },
  {
    title: 'Users Table',
    buttonText: 'Show all users',
    imageUrl: 'assets/images/home-panel-user-table.png',
    route: CLIENT_ROUTES.USER_TABLE,
    roles: [USER_ROLES.ADMIN],
  },
  {
    title: 'Profile page',
    buttonText: 'Go to your profile',
    imageUrl: 'assets/images/home-panel-profile-page.png',
    route: CLIENT_ROUTES.PROFILE,
    roles: [USER_ROLES.ADMIN, USER_ROLES.TOURNAMENT_CREATOR, USER_ROLES.TOURNAMENT_PARTICIPANT],
  },
  {
    title: 'Create a new game',
    buttonText: 'Create game',
    imageUrl: 'assets/images/home-panel-tournament-table.png',
    roles: [USER_ROLES.ADMIN],
    dialogComponent: GameCreateComponent,
  },
  {
    title: 'Create a new tournament',
    buttonText: 'Create tournament',
    imageUrl: 'assets/images/home-panel-tournament-table.png',
    roles: [USER_ROLES.ADMIN, USER_ROLES.TOURNAMENT_CREATOR],
    dialogComponent: TournamentManagementComponent,
  },
  {
    title: 'Create a new team',
    buttonText: 'Create team',
    imageUrl: 'assets/images/home-panel-tournament-table.png',
    roles: [USER_ROLES.TOURNAMENT_PARTICIPANT],
    dialogComponent: TeamManagementComponent,
  },
];
