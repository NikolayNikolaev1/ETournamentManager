import Game from './game.model';
import { TeamBase } from './team.model';

interface Tournament extends TournamentBase {
  description: string;
  tournamentType: number;
  minTeamMembers: number;
  game: Game;
  teams: TeamBase[];
  imgUrl?: string;
}

export interface TournamentBase {
  id: string;
  name: string;
}

export default Tournament;
