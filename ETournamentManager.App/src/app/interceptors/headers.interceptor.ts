import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TOKEN_KEY_NAME } from 'app/utils/constants';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(TOKEN_KEY_NAME);

    if (token === undefined) {
      return next.handle(req);
    }

    const headers = req.headers.append('Authorization', `Bearer ${token}`);
    return next.handle(req.clone({ headers }));
  }
}
