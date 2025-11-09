import { TeamBase } from './team.model';

interface Round {
  id: string;
  stage: RoundStage;
  tournamentId: string;
  winnerId?: string;
  nextRound?: Round;
  teams: TeamBase[];
}

export enum RoundStage {
  Finals = 0,
  Semifinals = 1,
  Quarterfinals = 2,
}

export default Round;
