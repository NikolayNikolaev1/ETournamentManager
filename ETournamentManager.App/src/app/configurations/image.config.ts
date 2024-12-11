import { environment } from 'environments/environment.development';

import { SERVER_ROUTES } from 'app/utils/constants';

export const DEFAULT_IMG_PATHS = {
  TEAM: 'assets/images/default-team-img.jpg',
  TOURNAMENT: 'assets/images/default-tournament-img.jpg',
  USER: 'assets/images/default-user-img.jpg',
};

export const IMAGE_URL = (name: string) => `${environment.apiUrl}/${SERVER_ROUTES.IMAGE.GET}/${name}.jpg`;

export type ImageUploadModel = {
  entityId: string;
  file: File;
};
