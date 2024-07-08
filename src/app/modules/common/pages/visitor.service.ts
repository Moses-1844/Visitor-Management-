import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { API_URL, API_ENDPOINTS } from '../../../core/shared/utils/const';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  private baseUrl = 'https://mrvisitease.com:8080/api/visitors';
  private basUrl = 'https://mrvisitease.com:8080/api';
  private apiUrl = 'https://mrvisitease.com:8080/api/visitors';

  constructor(private http: HttpClient) { }

  registerVisitor(visitor: any): Observable<any> {
    const url = `${API_URL}/${API_ENDPOINTS.addVisitor}`;
    return this.http.post<any>(url, visitor).pipe(
      map(response => {
        localStorage.setItem('visitorId', response.id);
        console.log('visitorId:', response.id);
        console.log('response:', response);
        return response; // Ensure that map returns the response for further processing or chaining
      }),
      catchError(error => {
        console.error('Error registering visitor:', error);
        return throwError(error); // Properly return an observable error
      })
    );
  }

  createAppointment(appointment: any): Observable<any> {
    const url = `${API_URL}/${API_ENDPOINTS.addAppointment}`;
    return this.http.post<any>(url, appointment).pipe(
        map(response => {
          localStorage.setItem('visitorId', response.id);
          console.log('visitorId:', response.id);
          console.log('response:', response);
          return response; // Ensure that map returns the response for further processing or chaining
        }),
        catchError(error => {
          console.error('Error registering visitor:', error);
          return throwError(error); // Properly return an observable error
        })
      );
  }

  getAppointmentsByInstitutionId(institutionId: number): Observable<any> {
    const url = `${this.basUrl}/appointments/institution/${institutionId}`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Error fetching appointments:', error);
        return throwError('An error occurred while fetching appointments. Please try again.');
      })
    );
  }
  getAppointments(): Observable<any> {
    const url = `${this.basUrl}/appointments`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Error fetching appointments:', error);
        return throwError('An error occurred while fetching appointments. Please try again.');
      })
    );
  }

  getVisitorById(id: string): Observable<any> {
    const url = `${API_URL}/${API_ENDPOINTS.getVisitorsById}/${id}`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error(`Error fetching visitor with ID ${id}:`, error);
        throw error;
      })
    );
  }

  getVisitors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }
  
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('An error occurred. Please try again.');
  }

  saveVisitor(visitor: any): Observable<any> {
    if (visitor.visitorid) {
      return this.http.put<any>(`${this.apiUrl}/${visitor.visitorid}`, visitor )
        .pipe(
          catchError(this.handleError)
        );
    } else {
      return this.http.post<any>(this.apiUrl, visitor)
        .pipe(
          catchError(this.handleError)
        );
    }
  }

  deleteVisitor(visitorId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${visitorId}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  checkIn(passcode: any): Observable<any> {
    const appointmentId = passcode.appointmentId;
    const url = `${this.baseUrl}/${appointmentId}/checkin`;
    return this.http.put<any>(url, passcode).pipe(
      tap(response => {
        console.log('Check-in response:', response);
      }),
      catchError(error => {
        console.error('Error checking in:', error);
        return throwError('An error occurred while checking in. Please try again.');
      })
    );
  }
  updateVisitor(id: string, visitorData: any): Observable<any> {
    const url = `${API_URL}/${API_ENDPOINTS.updateVisitor}/${id}`; // Adjust endpoint name as per your API
    return this.http.put<any>(url, visitorData).pipe(
      catchError(error => {
        console.error(`Error updating user with ID ${id}:`, error);
        throw error;
      })
    );
  }
  checkOut(passcode: any): Observable<any> {
    const appointmentId = passcode.appointmentId;
    const url = `${this.baseUrl}/${appointmentId}/checkout`;
    return this.http.put<any>(url, passcode).pipe(
      tap(response => {
        console.log('Check-out response:', response);
      }),
      catchError(error => {
        console.error('Error checking out:', error);
        return throwError('An error occurred while checking out. Please try again.');
      })
    );
  }
}
 

  

   