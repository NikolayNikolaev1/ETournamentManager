import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('tester');
    const token = localStorage.getItem('jwt_token');

    if (token === null) {
      return next.handle(req);
    }

    const headers = req.headers.append('Authorization', `Bearer ${token}`);
    return next.handle(req.clone({ headers }));
  }
}
