import Game from './game.model';

interface Tournament {
  id: string;
  name: string;
  description: string;
  tournamentType: number;
  minTeamMembers: number;
  game: Game;
}

export default Tournament