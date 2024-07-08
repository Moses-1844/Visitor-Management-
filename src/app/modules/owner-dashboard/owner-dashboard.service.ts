import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL, API_ENDPOINTS } from './../../core/shared/utils/const';

@Injectable({
  providedIn: 'root'
})
export class OwnerDashboardService {

  constructor(private http: HttpClient) {}
  

 

  getBanks(): Observable<any[]> {
    const url = `${API_URL}/${API_ENDPOINTS.users}`;
    return this.http.get<any[]>(url);
  }
  getSupport(): Observable<any[]> {
    const url = `${API_URL}/${API_ENDPOINTS.users}`;
    return this.http.get<any[]>(url);
  }
    getTotalVisitorsToday(): Observable<number> {
        const url = `${API_URL}/${API_ENDPOINTS.visitorsToday}`;
        return this.http.get<any[]>(url).pipe(
        map(visitors => visitors.length)
        );
    }
  
}
