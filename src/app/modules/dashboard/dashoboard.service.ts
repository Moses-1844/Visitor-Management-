import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://your-backend-url/api'; // Placeholder for real backend URL

  constructor(private http: HttpClient) {}

  getTotalVisitorsToday(): Observable<number> {
    return this.http.get<any[]>(`${this.apiUrl}/visitors/today`).pipe(
      map(visitors => visitors.length)
    );
  }

  fetchTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tasks`);
  }

  getRate(): Observable<number> {
    return this.http.get<any[]>(`${this.apiUrl}/rate`).pipe(
      map(rate => rate[0].value)
    );
  }

  getUnattendedVisitors(): Observable<number> {
    return this.http.get<any[]>(`${this.apiUrl}/visitors/unattended`).pipe(
      map(visitors => visitors.length)
    );
  }

  getActiveSessions(): Observable<number> {
    return this.http.get<any[]>(`${this.apiUrl}/sessions/active`).pipe(
      map(sessions => sessions.length)
    );
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  updateUserStatus(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/status/${user.user_id}`, user);
  }

  updateUserChekinStatus(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/checkin-status/${user.user_id}`, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${userId}`);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${user.user_id}`, user);
  }
}
