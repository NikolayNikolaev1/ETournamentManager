import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../assets/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(userName: string, password: string) {
    return this.http.post<{ token: string }>(`${environment.apiUrl}/Auth/Login`, { userName, password });
  }
}
