interface User extends UserBase {
  email: string;
  roleName: string;
  teamIds: string[];
}

export interface UserBase {
  id: string;
  userName: string;
  email: string;
}

export default User;
