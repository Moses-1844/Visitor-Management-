import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_ENDPOINTS } from '../../../core/shared/utils/const'; // Adjust the path accordingly
  

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private role: string;

  constructor(private http: HttpClient) {}

  signIn(email: string, password: string): Observable<any> {
    return this.http
      .get<any>('http://localhost:3000/users', { params: { email, password } })
      .pipe(
        catchError(error => {
          return throwError('Invalid email or password');
        })
      );
  }

  resetPassword(data: any, token: string) {
    // Assuming `API_ENDPOINTS.resetPassword` is a string containing the reset password endpoint
    return this.http.post(API_ENDPOINTS.resetPassword, token, data); // Assuming `requestCall` is not needed
  }

  forgetPassword(data: any) {
    // Assuming `API_ENDPOINTS.forgetPassword` is a string containing the forget password endpoint
    return this.http.post(API_ENDPOINTS.forgetPassword, '', data); // Assuming `requestCall` is not needed
  }

  register(data: any) {
    // Assuming `API_ENDPOINTS.signUp` is a string containing the sign up endpoint
    return this.http.post(API_ENDPOINTS.registerUser, '', data); // Assuming `requestCall` is not needed
  }

  setRole(role: string) {
    this.role = role;
    localStorage.setItem('userRole', role);
  }

  getRole(): string {
    return localStorage.getItem('userRole');
  }

  logout() {
    localStorage.clear();
  }
}
