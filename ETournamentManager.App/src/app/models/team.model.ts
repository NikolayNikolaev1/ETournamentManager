import { UserBase } from './user.model';

interface Team {
  id: string;
  name: string;
  tag: string;
  imgUrl: string;
  members: UserBase[];
  tournamentsWon: number;
}

export default Team;
