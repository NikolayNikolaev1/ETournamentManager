export const CLIENT_ROUTES = {
  PROFILE: '/profile',
  TEAM_DETAILS: (id: string = '') => `/team/${id}`,
  TEAM_TABLE: '/teams',
  TOURNAMENT_DETAILS: (id: string = '') => `/tournament/${id}`,
  TOURNAMENT_TABLE: '/tournaments',
  USER_TABLE: '/users',
};

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  TOURNAMENT_CREATOR: 'TOURNAMENT_CREATOR',
  TOURNAMENT_PARTICIPANT: 'TOURNAMENT_PARTICIPANT',
  GUEST: 'GUEST',
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
    CHANGE_STATUS: 'User/ChangeStatus',
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
    DELETE: 'Tournament/Delete',
    ADD_PARTICIPANT: 'Tournament/AddParticipant',
    REMOVE_PARTICIPANT: 'Tournament/RemoveParticipant',
    FINISH: 'Tournament/Finish',
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
  BRANDING: {
    GET: 'Branding/Get',
    UPDATE_INFO: 'Branding/UpdateInfo',
    UPDATE_ACCESS: 'Branding/UpdateAccess',
    UPDATE_THEME: 'Branding/UpdateTheme',
  },
};
//
export const GLOBAL_CONSTANTS = {
  CLIENT_ROUTES: {
    PROFILE: '/profile',
    TEAM_DETAILS: (id: string) => `/team/${id}`,
    TEAM_TABLE: '/teams',
    TOURNAMENT_DETAILS: (id: string) => `/tournament/${id}`,
    TOURNAMENT_TABLE: '/tournaments',
  },
  ROLES: {
    ADMIN: 'ADMIN',
    TOURNAMENT_CREATOR: 'TOURNAMENT_CREATOR',
    TOURNAMENT_PARTICIPANT: 'TOURNAMENT_PARTICIPANT',
  },
  SERVER_ROUTES: {
    AUTH: {
      LOGIN: 'Auth/Login',
      REGISTER: 'Auth/Register',
      PASSWORD_CHANGE: 'Auth/PasswordChange',
    },
    USER: {
      GET_ALL: 'User/GetAll',
      EDIT_USERNAME: 'User/EditUserName',
      CHANGE_STATUS: 'User/ChangeStatus',
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
      DELETE: 'Tournament/Delete',
      ADD_PARTICIPANT: 'Tournament/AddParticipant',
      REMOVE_PARTICIPANT: 'Tournament/RemoveParticipant',
      FINISH: 'Tournament/Finish',
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
    BRANDING: {
      GET: 'Branding/Get',
      UPDATE_INFO: 'Branding/UpdateInfo',
      UPDATE_ACCESS: 'Branding/UpdateAccess',
      UPDATE_THEME: 'Branding/UpdateTheme',
    },
  },
};

export const WEBSITE_NAME: string = 'Tournament Manager';
export const TOKEN_KEY_NAME: string = 'jwt_token';

export const CLIENT_VALIDATION_ERROR_TITLE: string = 'Invalid User Action!';

export const ADMIN_ROLE = 'ADMIN';
export const TOURNAMENT_CREATOR_ROLE = 'TOURNAMENT_CREATOR';
export const TOURNAMENT_PARTICIPANT_ROLE = 'TOURNAMENT_PARTICIPANT';

export const PASSWORD_MISSMATCH_ERROR = 'Password missmatch!';
export const PASSWORD_LENGTH_ERROR = 'Passwords must be at least 6 characters!';
