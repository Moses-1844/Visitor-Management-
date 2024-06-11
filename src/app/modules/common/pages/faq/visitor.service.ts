import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Visitor } from './visitor';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  private apiUrl = 'http://your-api-url.com/api/visitors'; // replace with your API URL

  constructor(private http: HttpClient) { }

  getVisitor(idNumber: number): Observable<Visitor> {
    const url = `${this.apiUrl}/${idNumber}`;
    return this.http.get<Visitor>(url);
  }

  updateVisitor(visitor: Visitor): Observable<Visitor> {
    const url = `${this.apiUrl}/${visitor.idNumber}`;
    return this.http.put<Visitor>(url, visitor);
  }
}