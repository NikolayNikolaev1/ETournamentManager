import { UserBase } from './user.model';

interface Team {
  id: string;
  name: string;
  tag: string;
  imgUrl?: string;
  members: UserBase[];
  tournamentsWon: number;
}

export interface TeamBase {
  id: string;
  name: string;
}

export default Team;
