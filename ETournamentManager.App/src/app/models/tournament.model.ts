import Game from './game.model';

interface Tournament extends TournamentBase {
  description: string;
  tournamentType: number;
  minTeamMembers: number;
  game: Game;
  imgUrl?: string;
}

export interface TournamentBase {
  id: string;
  name: string;
}

export default Tournament;
