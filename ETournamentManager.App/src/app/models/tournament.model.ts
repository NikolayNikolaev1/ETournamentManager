import Game from './game.model';
import Round from './round.model';
import { TeamBase } from './team.model';
import { UserBase } from './user.model';

interface Tournament extends TournamentBase {
  description: string;
  tournamentType: number;
  minTeamMembers: number;
  active: boolean;
  game: Game;
  creator: UserBase;
  teams: TeamBase[];
  imgUrl?: string;
}

export interface TournamentBase {
  id: string;
  name: string;
  finished: boolean;
}

export interface TournamentRounds extends TournamentBase {
  game: string;
  teams: TeamBase[];
  rounds: Round[];
}

export default Tournament;
