import { Injectable } from '@angular/core';

import { Observable, catchError, map, of } from 'rxjs';

import { IMAGE_URL, ImageUploadModel } from 'app/configurations/image.config';
import { ApiService } from 'app/services/api.service';
import { SERVER_ROUTES } from 'app/utils/constants';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private apiService: ApiService) {}

  getImageUrl(name: string, defaultImgUrl: string): Observable<string> {
    return this.apiService.request({ method: 'get', url: name, isFile: true }).pipe(
      map(() => ''),
      catchError((isValid) => of(isValid ? IMAGE_URL(name) : defaultImgUrl))
    );
  }

  upload(name: string, file: File): Observable<void> {
    return this.apiService.request<void, ImageUploadModel>({
      method: 'post',
      url: SERVER_ROUTES.IMAGE.UPLOAD,
      body: {
        entityId: name,
        file: file,
      },
      isFile: true,
    });
  }

  delete = (imageName: string): Observable<void> =>
    this.apiService.request({ url: `${SERVER_ROUTES.IMAGE.DELETE}/${imageName}`, method: 'delete' });
}
