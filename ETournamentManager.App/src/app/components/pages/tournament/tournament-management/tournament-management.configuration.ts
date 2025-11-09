export enum TournamentType {
  SinglePlayer = 0,
  Team = 1,
}

export type TOURNAMENT_CREATE_FORM = {
  name: string;
  description: string;
  minTeamMembers: number;
};

export type TOURNAMENT_MANAGEMENT_REQUEST_BODY = {
  name: string;
  description?: string;
  type: TournamentType;
  minTeamMembers: number;
  gameId: string;
};
