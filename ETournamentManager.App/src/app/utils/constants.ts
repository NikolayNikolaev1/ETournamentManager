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
    PASSWORD_CHANGE: 'Auth/PasswordChange',
  },
  USER: {
    GET_ALL: 'User/GetAll',
    EDIT_USERNAME: 'User/EditUserName',
  },
  GAME: {
    GET_ALL: 'Game/GetAll',
    CREATE: 'Game/Create',
  },
  TOURNAMENT: {
    GET: 'Tournament/Get',
    GET_ALL: 'Tournament/GetAll',
    GET_ALL_ROUNDS: 'Tournament/GetAllWithRounds',
    CREATE: 'Tournament/Create',
    UPDATE: 'Tournament/Update',
    ADD_PARTICIPANT: 'Tournament/AddParticipant',
    REMOVE_PARTICIPANT: 'Tournament/RemoveParticipant',
  },
  TEAM: {
    CREATE: 'Team/Create',
    GET: 'Team/Get',
    GET_ALL: 'Team/GetAll',
    UPDATE: 'Team/Update',
    DELETE: 'Team/Delete',
    ADD_MEMBER: 'Team/AddMember',
    REMOVE_MEMBER: 'Team/RemoveMember',
  },
  ROUND: {
    GET_ALL: 'Round/GetAll',
    GENERATE: 'Round/Generate',
    END: 'Round/End',
  },
  IMAGE: {
    GET: 'UploadImages',
    UPLOAD: 'Image/Upload',
    DELETE: 'Image/Delete',
  },
};
