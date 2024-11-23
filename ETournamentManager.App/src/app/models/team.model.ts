import { UserBase } from './user.model';

interface Team extends TeamBase {
  description: string;
  members: UserBase[];
  tournamentsWon: number;
  captain: UserBase;
}

export interface TeamBase {
  id: string;
  name: string;
  tag: string;
  imgUrl?: string;
  finished: boolean;
}

export default Team;
