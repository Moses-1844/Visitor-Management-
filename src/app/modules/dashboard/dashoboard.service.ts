import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getAllUsers(): Observable<any[]> {
    const url = `${API_URL}/${API_ENDPOINTS.users}`;
    return this.http.get<any[]>(url);
  }

  updateUserStatus(user: any): Observable<any> {
    const url = `${API_URL}/${API_ENDPOINTS.updateUserStatus}/${user.user_id}`;
    return this.http.put<any>(url, user);
  }

  updateUserCheckinStatus(user: any): Observable<any> {
    const url = `${API_URL}/${API_ENDPOINTS.updateUserCheckinStatus}/${user.user_id}`;
    return this.http.put<any>(url, user);
  }

  deleteUser(userId: number): Observable<any> {
    const url = `${API_URL}/${API_ENDPOINTS.deleteUser}/${userId}`;
    return this.http.delete<any>(url);
  }

  updateUser(user: any): Observable<any> {
    const url = `${API_URL}/${API_ENDPOINTS.updateUser}/${user.user_id}`;
    return this.http.put<any>(url, user);
  }
  
}
