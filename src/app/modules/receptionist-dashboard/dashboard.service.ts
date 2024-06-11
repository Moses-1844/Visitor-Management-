import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://'; // JSON server URL

  constructor(private http: HttpClient) {}

  getTotalVisitorsToday(): Observable<number> {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    return this.http.get<any[]>(`${this.apiUrl}/visitors`).pipe(
      map(visitors => visitors.filter(visitor => visitor.date === today).length)
    );
  }
 fetchTasks(): Observable<any[]> {
    return this.http.get<any[]>('api_url');
}
  getRate(): Observable<number> {
    return this.http.get<any[]>(`${this.apiUrl}/rate`).pipe(
      map(rate => rate[0].value)
    );
  }
    getUnattendedVisitors(): Observable<number> {
        return this.http.get<any[]>(`${this.apiUrl}/visitors`).pipe(
        map(visitors => visitors.filter(visitor => visitor.attended === false).length)
        );
    }
    getActiveSessions(): Observable<number> {
        return this.http.get<any[]>(`${this.apiUrl}/sessions`).pipe(
        map(sessions => sessions.filter(session => session.active === true).length)
        );
    }
    getUserList(): Observable<any> {
      return this.http.get('api_url_to_get_user_list');
    }
    updateUser(user: FormData): Observable<any> {
      return this.http.put('api_url_to_update_user', user, {
          headers: new HttpHeaders({
              'enctype': 'multipart/form-data'
          })
      });
  }
  deleteUser(userId: any): Observable<any> {
    return this.http.delete(`api_url_to_delete_user/${userId}`);
  }
    /*// should return data in the following format
    user_id: '2',
          email: 
          company: 
          reason: 
          chekinStatus: 1,
          username: 
  updateUser(user: FormData): Observable<any> {
    return this.http.put('api_url_to_update_user', user, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    });
  }
  getReasonList(): Observable<any> {
    return this.http.get('api_url_to_get_reason_list');
      return this.http.get('api_url_to_get_reason_list');
  }
}*/
}
