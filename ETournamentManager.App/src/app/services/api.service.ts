import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'environments/environment.development';
import { catchError, throwError } from 'rxjs';

import { IMAGE_URL } from 'app/configurations/image.config';
import { CLIENT_VALIDATION_ERROR_TITLE } from 'app/utils/constants';

type QueryParams = {
  search?: string;
  role?: string;
  userIds?: string[];
  tournamentIds?: string[];
  teamIds?: string[];
  gameIds?: string[];
  isPrivate?: boolean;
  withoutMemberIds?: string[];
  returnUrl?: string;
};

interface ApiRequestData<TBody> {
  url: string;
  method: 'get' | 'post' | 'patch' | 'delete';
  body?: TBody;
  isFile?: boolean;
  queryParams?: QueryParams;
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
    queryParams = {},
  }: ApiRequestData<TRquestBody>) {
    const formData = new FormData();
    let params = new HttpParams();
    let requestUrl = `${environment.apiUrl}/api/${url}`;

    if (isFile) {
      if (method === 'get') {
        requestUrl = IMAGE_URL(url);
      } else if (method === 'post') {
        const { entityId, file } = body as { entityId: string; file: any };
        formData.append('file', file);
        formData.append('entityId', entityId);
      }
    }

    Object.keys(queryParams).forEach((qp) => {
      const queryParam = queryParams[qp as keyof QueryParams]!;

      params = params.set(qp, Array.isArray(queryParam) ? queryParam.join(', ') : queryParam);
    });
    // TODO: Add plain/text response.
    return this.http
      .request<TResponse>(method, requestUrl, {
        body: isFile ? formData : body,
        params,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('A client error occurred:', error.error);
      return throwError(() => '');
    }

    if (error.status === 200) {
      return throwError(() => true);
    }

    console.error(`Backend returned code ${error.status}, body was: `, error.error);

    // // Return an observable with a user-facing error message.
    if (error.error?.title === CLIENT_VALIDATION_ERROR_TITLE) return throwError(() => error.error.detail);

    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    // this.router.navigate(['/500']) // TODO: Fix undefined router problem to redirect to 500 server errror page.
    return throwError(() => '');
  }
}
