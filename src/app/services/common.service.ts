import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { 

  }

  /* Post API Call */ 
  postData(url:any,body:any): Observable<any>{
    return this.http.post(environment.localhostURL + url,body);
  }
}
