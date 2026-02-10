import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HealthResponse } from 'src/app/models/health-response.model';
import { LoginRequest, LoginResponse } from 'src/app/models/login.model';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private http: HttpClient) {}
  private baseUrl = "http://localhost:8080/api";
  
  getHealth() {
    return this.http.get<HealthResponse>(this.baseUrl+'/health', {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  login(credentials: LoginRequest) {
    return this.http.post<LoginResponse>(this.baseUrl+'/login', credentials, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
