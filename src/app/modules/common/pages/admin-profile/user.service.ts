import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_URL, API_ENDPOINTS } from '../../../../core/shared/utils/const';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  
   
  getUser(id: number): Observable<any> {
    const url = `${API_URL}/${API_ENDPOINTS.getUserDetails}/${id}`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Error fetching visitor details:', error);
        return throwError('An error occurred while fetching visitor details. Please try again.');
      })
    );
  } 
  updateUser(id: string, userData: any): Observable<any> {
    const url = `${API_URL}/${API_ENDPOINTS.updateUser}/${id}`;  
    return this.http.put<any>(url, userData).pipe(
      catchError(error => {
        console.error(`Error updating user with ID ${id}:`, error);
        throw error;
      })
    );
  }
  getInstitutionData(id:number): Observable<any> {
    const url = `${API_URL}/${API_ENDPOINTS.getInstitutionData}`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Error fetching institution data:', error);
        return throwError('An error occurred while fetching institution data. Please try again.');
      })
    );
  }
}
