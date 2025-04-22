import { GameCreateComponent } from 'app/components/dialogs/game-create/game-create.component';
import { LoginComponent } from 'app/components/dialogs/login/login.component';
import { RegisterComponent } from 'app/components/dialogs/register/register.component';
import { TeamManagementComponent } from 'app/components/dialogs/team-management/team-management.component';
import { TournamentManagementComponent } from 'app/components/pages/tournament/tournament-management/tournament-management.component';
import { CLIENT_ROUTES, USER_ROLES } from 'app/utils/constants';
import { NavPanelItem } from 'app/utils/types';

export const HOME_PANEL_CONFIG: NavPanelItem[] = [
  {
    title: 'Log in to your account',
    buttonText: 'Login',
    imageUrl: 'assets/images/home-panel-login.svg',
    roles: [USER_ROLES.GUEST],
    dialogComponent: LoginComponent,
  },
  {
    title: 'Create a new account',
    buttonText: 'Register',
    imageUrl: 'assets/images/home-panel-register.svg',
    roles: [USER_ROLES.GUEST],
    dialogComponent: RegisterComponent,
  },
  {
    title: 'Tournaments Table',
    buttonText: 'Show all',
    imageUrl: 'assets/images/home-panel-tournament-table.svg',
    route: CLIENT_ROUTES.TOURNAMENT_TABLE,
    roles: [],
  },
  {
    title: 'Teams Table',
    buttonText: 'Show all',
    imageUrl: 'assets/images/home-panel-team-table.svg',
    route: CLIENT_ROUTES.TEAM_TABLE,
    roles: [],
  },
  {
    title: 'Users Table',
    buttonText: 'Show all users',
    imageUrl: 'assets/images/home-panel-user-table.svg',
    route: CLIENT_ROUTES.USER_TABLE,
    roles: [USER_ROLES.ADMIN],
  },
  {
    title: 'Profile page',
    buttonText: 'Go to your profile',
    imageUrl: 'assets/images/home-panel-profile-page.svg',
    route: CLIENT_ROUTES.PROFILE,
    roles: [USER_ROLES.ADMIN, USER_ROLES.TOURNAMENT_CREATOR, USER_ROLES.TOURNAMENT_PARTICIPANT],
  },
  {
    title: 'Create a new game',
    buttonText: 'Create game',
    imageUrl: 'assets/images/home-panel-create-game.svg',
    roles: [USER_ROLES.ADMIN],
    dialogComponent: GameCreateComponent,
  },
  {
    title: 'Create a new tournament',
    buttonText: 'Create tournament',
    imageUrl: 'assets/images/home-panel-create-tournament.svg',
    roles: [USER_ROLES.ADMIN, USER_ROLES.TOURNAMENT_CREATOR],
    dialogComponent: TournamentManagementComponent,
  },
  {
    title: 'Create a new team',
    buttonText: 'Create team',
    imageUrl: 'assets/images/home-panel-create-team.svg',
    roles: [USER_ROLES.TOURNAMENT_PARTICIPANT],
    dialogComponent: TeamManagementComponent,
  },
];
