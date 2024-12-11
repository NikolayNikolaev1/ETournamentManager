import { UserBase } from './user.model';

interface Team extends TeamBase {
  description: string;
  members: UserBase[];
  captain: UserBase;
}

export interface TeamBase {
  id: string;
  name: string;
  tag: string;
  imgUrl?: string;
  finished: boolean;
  tournamentsWon: number;
  membersCount: number;
}

export default Team;
