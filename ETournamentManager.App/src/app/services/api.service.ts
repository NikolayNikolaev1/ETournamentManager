import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CLIENT_VALIDATION_ERROR_TITLE } from 'app/utils/constants';

import { environment } from 'environments/environment.development';
import { catchError, throwError } from 'rxjs';

interface ApiRequestData<TBody> {
  url: string;
  method: 'get' | 'post' | 'patch' | 'delete';
  body?: TBody;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  request = <TResponse, TRquestBody = undefined>({ url, method, body }: ApiRequestData<TRquestBody>) =>
    this.http.request<TResponse>(method, `${environment.apiUrl}/${url}`, { body }).pipe(catchError(this.handleError));

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('A client error occurred:', error.error);
      return throwError(() => '');
    }

    // // Return an observable with a user-facing error message.
    if (error.error.title === CLIENT_VALIDATION_ERROR_TITLE) return throwError(() => error.error.detail);

    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(`Backend returned code ${error.status}, body was: `, error.error);
    return throwError(() => '');
  }
}
