import {
  TOURNAMENT_CREATOR_ROLE,
  TOURNAMENT_PARTICIPANT_ROLE,
} from 'app/utils/constants';

export enum UserRoles {
  TournamentCreator = TOURNAMENT_CREATOR_ROLE,
  TournamentParticipant = TOURNAMENT_PARTICIPANT_ROLE,
}

export type REGISTER_FORM_MODEL = {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
};

export type REGISTER_REQUEST_BODY = {
  userName: string;
  email: string;
  password: string;
  roleName: UserRoles;
};
