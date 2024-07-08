import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL, API_ENDPOINTS } from './../../core/shared/utils/const';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {}

  getTotalVisitorsToday(): Observable<number> {
    const url = `${API_URL}/${API_ENDPOINTS.visitorsToday}`;
    return this.http.get<any[]>(url).pipe(
      map(visitors => visitors.length)
    );
  }

  fetchTasks(): Observable<any[]> {
    const url = `${API_URL}/${API_ENDPOINTS.fetchTasks}`;
    return this.http.get<any[]>(url);
  }

  getRate(): Observable<number> {
    const url = `${API_URL}/${API_ENDPOINTS.getRate}`;
    return this.http.get<any[]>(url).pipe(
      map(rate => rate[0].value)
    );
  }

  getUnattendedVisitors(): Observable<number> {
    const url = `${API_URL}/${API_ENDPOINTS.unattendedVisitors}`;
    return this.http.get<any[]>(url).pipe(
      map(visitors => visitors.length)
    );
  }

  getActiveSessions(): Observable<number> {
    const url = `${API_URL}/${API_ENDPOINTS.activeSessions}`;
    return this.http.get<any[]>(url).pipe(
      map(sessions => sessions.length)
    );
  }

  getVisitorsList(): Observable<any[]> {
    const url = `${API_URL}/${API_ENDPOINTS.visitorsList}`;
    return this.http.get<any[]>(url);
  }

  updateUser(user: FormData): Observable<any> {
    const url = `${API_URL}/${API_ENDPOINTS.updateUser}`;
    return this.http.put<any>(url, user, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    });
  }

  deleteUser(userId: string): Observable<any> {
    const url = `${API_URL}/${API_ENDPOINTS.deleteUser}/${userId}`;
    return this.http.delete<any>(url);
  }

  getDepartments(): Observable<any[]> {
    const url = `${API_URL}/${API_ENDPOINTS.departments}`;
    return this.http.get<any[]>(url);
  }
}
