import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL, API_ENDPOINTS } from '../../../../core/shared/utils/const';
@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http: HttpClient) { }

  registerInstitution(institutionDetails: any): Observable<any> {
    return this.http.post<any>('https://mrvisitease.com:8080/api/institutions/create', institutionDetails).pipe(
      map(response => {         
        localStorage.setItem('institutionid', response.id); 
        console.log('response:', response.id);
        return response;  
        console.log(response);
      }),
      catchError(error => {
        console.error('Error during register:', error);
        return throwError('Failed to register institution');
      }));
    
  }

  registerAdmin(adminDetails: any): Observable<any> {
    // Retrieve institutionId from adminDetails or localStorage
    const institutionId = adminDetails.institutionId || localStorage.getItem('institutionId');
  
    // Construct URL with query parameter
    const url = `https://mrvisitease.com:8080/api/users/institution-admin?institutionId=${institutionId}`;
  
    // Make POST request with adminDetails
    return this.http.post<any>(url, adminDetails).pipe(
      map(response => {
        return response;  
      }),
      catchError(error => {
        console.error('Error during sign-in:', error);
        return throwError('Failed to sign in');
      })
    );
  }
  
}
