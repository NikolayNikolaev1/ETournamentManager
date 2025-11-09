import { TeamBase } from 'app/models/team.model';
import Tournament from 'app/models/tournament.model';
import User, { UserBase } from 'app/models/user.model';

import { InfoCard } from './types';

export const convertTeamInfoCard = (team: TeamBase): InfoCard => ({
  id: team.id,
  name: team.name,
  subname: team.tag,
  imageUrl: team.imgUrl ?? '',
});

export const convertTournamentInfoCard = (tournament: Tournament): InfoCard => ({
  id: tournament.id,
  name: tournament.name,
  imageUrl: tournament.imgUrl ?? '',
});

export const convertUserInfoCard = (user: UserBase): InfoCard => ({
  id: user.id,
  name: user.userName,
  imageUrl: user.imgUrl ?? '',
});
