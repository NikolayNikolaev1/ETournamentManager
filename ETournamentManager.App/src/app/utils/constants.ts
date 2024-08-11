export const WEBSITE_NAME: string = 'Tournament Manager';
export const TOKEN_KEY_NAME: string = 'jwt_token';

export const CLIENT_VALIDATION_ERROR_TITLE: string = 'Invalid User Action!';

export const ADMIN_ROLE = 'ADMIN';
export const TOURNAMENT_CREATOR_ROLE = 'TOURNAMENT_CREATOR';
export const TOURNAMENT_PARTICIPANT_ROLE = 'TOURNAMENT_PARTICIPANT';

export const PASSWORD_MISSMATCH_ERROR = 'Password missmatch!';
export const PASSWORD_LENGTH_ERROR = 'Passwords must be at least 6 characters!';

export const CLIENT_ROUTES = {
  AUTH: {
    LOGIN: 'login',
    REGISTER: 'register',
  },
  GAME: {
    CREATE: 'game/create',
  },
  TEAM: {
    CREATE: 'team/create',
    GET: 'team/:id',
  },
};

export const SERVER_ROUTES = {
  AUTH: {
    LOGIN: 'Auth/Login',
    REGISTER: 'Auth/Register',
  },
  USER: {
    GET_ALL: 'User/GetAll',
  },
  GAME: {
    CREATE: 'Game/Create',
  },
  TOURNAMENT: {
    GET: 'Tournament/Get',
    CREATE: 'Tournament/Create',
  },
  TEAM: {
    CREATE: 'Team/Create',
    GET: 'Team/Get',
    GetAll: 'Team/GetAll',
    UPDATE: 'Team/Update',
    DELETE: 'Team/Delete',
    ADD_MEMBER: 'Team/AddMember',
  },
  IMAGE: {
    GET: 'UploadImages',
    UPLOAD: 'Image/Upload',
    DELETE: 'Image/Delete',
  },
};
