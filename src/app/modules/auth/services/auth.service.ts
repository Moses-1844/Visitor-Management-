
/*@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private role: string;

  constructor(private http: HttpClient) {}

  signIn(email: string, password: string): Observable<any> {
    const url = `${API_URL}/${API_ENDPOINTS.signIn}`;
    return this.http.post<any>(url, { email, password }).pipe(
      map(response => {
        this.setRole(response.role); // Set user role
        this.storeToken(response.token); // Store token
        return response; // Return full response for further processing if needed
      }),
      catchError(error => {
        console.error('Error during sign-in:', error);
        return throwError('Failed to sign in');
      })
    );
  }

  private storeToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
  }
}
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL, API_ENDPOINTS } from '../../../core/shared/utils/const';  

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private role: string;

  constructor(private http: HttpClient) {}

  signIn(email: string, password: string, role:string): Observable<any> {
    const url = 'https://mrvisitease.com:8080/api/users/login';
    return this.http.post<any>(url, { email, password,role }).pipe(
      map(response => {
        // Assuming response contains the user details including role
        this.setRole(response.role); // Set user role
        localStorage.setItem('institutionid', response.institutionId);
        localStorage.setItem('institutionName', response.institutionName);
        console.log('response:', response.institutionName);
        console.log('response:', response.institutionId);
        return response; // Return full response for further processing if needed
      }),
      catchError(error => {
        console.error('Error during sign-in:', error);
        return throwError('Failed to sign in');
      })
    );
  }

  resetPassword(data: any,  ): Observable<any> {
    const url = `${API_URL}/${API_ENDPOINTS.resetPassword}`;
    return this.http.post<any>(url, {   ...data }).pipe(
      catchError(error => {
        console.error('Error resetting password:', error);
        return throwError('Failed to reset password');
      })
    );
   }

  forgetPassword(data: any): Observable<any> {
    const url = `${API_URL}/${API_ENDPOINTS.forgetPassword}`;
    return this.http.post<any>(url, data).pipe(
      catchError(error => {
        console.error('Error forgetting password:', error);
        return throwError('Failed to request password reset');
      })
    );
  }

  register(data: any): Observable<any> {
    const url = `${API_URL}/${API_ENDPOINTS.registerUser}`;
    console.log('Registering user with data:', data); // Debug: Log the data being sent
    return this.http.post<any>(url, data).pipe(
      catchError(error => {
        console.error('Error during registration:', error);
        return throwError('Failed to register');
      })
    );
  }

  setRole(role: string) {
    this.role = role;
    localStorage.setItem('userRole', role);
  }

  getRole(): string {
    return localStorage.getItem('userRole');
  }
  setUserDetails(userId: string, institutionId: string): void {
    localStorage.setItem('userId', userId);
    localStorage.setItem('institutionId', institutionId);
  }

  getUserDetails(): { userId: string, institutionId: string } {
    return {
      userId: localStorage.getItem('userId') || '',
      institutionId: localStorage.getItem('institutionId') || ''
    };
  }
  logout() {
    localStorage.clear();
  }
}
