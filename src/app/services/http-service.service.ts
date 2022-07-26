import { Injectable } from '@angular/core';
import { Observable, map, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  public currentUserSubject: BehaviorSubject<any>;
  //public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(null);
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  // "name": "abcd@hhd.com",
  // "password": "1234"

  login(loginData: any): Observable<any> {
    return this.http.post('/api/login', loginData).pipe(map((data: any) => {
      if (data) {
        //localStorage.setItem('token', data.token);
        this.currentUserSubject.next(data.token);
      }
      return data;
    }));
  }

  getOutstandingDetails(): Observable<any> {
    return this.http.get('/api/getOutstandingHistory/62b15c7f15327f43f5a14621');
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }
}
