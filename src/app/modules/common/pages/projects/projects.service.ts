import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
    private apiUrl = 'http://'; // replace with your actual API URL
  constructor(private http: HttpClient) { }

  getUserList(): Observable<any> {
    return this.http.get('api_url_to_get_user_list');
  }
  /*// should return data in the following format
  user_id: '2',
        email: 
        company: 
        reason: 
        chekinStatus: 1,
        username: 
  */
updateUser(user: FormData): Observable<any> {
    return this.http.put('api_url_to_update_user', user, {
        headers: new HttpHeaders({
            'enctype': 'multipart/form-data'
        })
    });
}
getReasonList(): Observable<any> {
    return this.http.get('api_url_to_get_reason_list');
}
  


deleteUser(userId: any): Observable<any> {
    return this.http.delete(`api_url_to_delete_user/${userId}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post('api_url_to_create_user', user);
  }
  deleteProject(id: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}