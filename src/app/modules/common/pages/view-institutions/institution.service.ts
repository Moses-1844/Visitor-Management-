import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  private apiUrl = 'https://mrvisitease.com:8080/api/institutions';

  constructor(private http: HttpClient) { }

  getBanks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  saveBank(bank: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${bank.id}`, bank).pipe(
      catchError(this.handleError)
    );
  }

  deleteBank(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Server Error:', error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('Client-side error:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something went wrong; please try again later.');
  }
}
