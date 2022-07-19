import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { exhaustMap, Observable, take } from 'rxjs';
import { environment } from '../../environments/environment'
import { HttpServiceService } from './http-service.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient,private authService:HttpServiceService) { 

  }
  
  /* Post API Call */ 
  postData(url:any,body:any): Observable<any>{
    return this.http.post<any>(url,body);
  }      
}
