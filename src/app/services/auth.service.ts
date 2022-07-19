import { Injectable } from '@angular/core';
import { Observable, map, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(null);
  }

  // "name": "abcd@hhd.com",
	// "password": "1234"

  login(loginData: any): Observable<any> {
    return this.http.post('/api/login', loginData).pipe(map((data: any) => {
      if (data) {
        this.currentUserSubject.next(data.token);
      }
      return data;
    }));
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }
}
