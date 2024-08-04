import { environment } from 'environments/environment.development';
import { catchError, throwError } from 'rxjs';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CLIENT_VALIDATION_ERROR_TITLE } from 'app/utils/constants';

interface ApiRequestData<TBody> {
  url: string;
  method: 'get' | 'post' | 'patch' | 'delete';
  body?: TBody;
  isFile?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  request<TResponse, TRquestBody = undefined>({
    url,
    method,
    body,
    isFile = false,
  }: ApiRequestData<TRquestBody>) {
    const formData = new FormData();

    if (isFile) {
      const { entityId, file } = body as { entityId: string; file: any };
      formData.append('file', file);
      formData.append('entityId', entityId);
    }

    return this.http
      .request<TResponse>(method, `${environment.apiUrl}/${url}`, {
        body: isFile ? formData : body,
      })
      .pipe(catchError(this.handleError));
  }

  uploadImage(id: string, file: any) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('entityId', id);

    return this.http.post(environment.apiUrl + '/Image/Upload', formData);
  }

  getFile(name: string) {
    return this.http.get(`https://localhost:7136/UploadFiles/${name}`);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('A client error occurred:', error.error);
      return throwError(() => '');
    }

    console.error(`Backend returned code ${error.status}, body was: `, error.error);

    // // Return an observable with a user-facing error message.
    if (error.error?.title === CLIENT_VALIDATION_ERROR_TITLE)
      return throwError(() => error.error.detail);

    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    // this.router.navigate(['/500']) // TODO: Fix undefined router problem to redirect to 500 server errror page.
    return throwError(() => '');
  }
}
