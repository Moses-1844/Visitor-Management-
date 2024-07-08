import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'https://mrvisitease.com:8080/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${userId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  editUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/edit`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  registerAdmin(adminDetails: any): Observable<any> {
    const institutionId = adminDetails.institutionId || localStorage.getItem('institutionId');
    const url = `${this.apiUrl}/institution-admin?institutionId=${institutionId}`;

    return this.http.post<any>(url, adminDetails)
      .pipe(
        map(response => response),
        catchError(error => {
          console.error('Error during registration:', error);
          return throwError(() => new Error('Failed to register admin'));
        })
      );
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
