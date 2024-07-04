export const LOGIN_ROUTE: string = 'Auth/Login';

export type LOGIN_REQUEST_BODY = { username: string; password: string };
export type LOGIN_RESPONSE_TYPE = { token: string };
