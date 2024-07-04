import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'environments/environment.development';

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
    this.http.request<TResponse>(method, `${environment.apiUrl}/${url}`, { body });
}
