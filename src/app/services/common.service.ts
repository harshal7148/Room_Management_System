import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { 
  }
  
  /* Post API Call */ 
  postData(url:any,body:any): Observable<any>{
    return this.http.post<any>(url,body);
  }     
  
  /* Get API Call */ 
  getData(url:any): Observable<any> {
    return this.http.get(url);
  }

  /* Put API Call */ 
  putData(url:any,body:any): Observable<any>{
    return this.http.put<any>(url,body);
  } 
  
  /* Delete API Call */ 
  deleteData(url:any,id:any): Observable<any>{
    return this.http.delete<any>(url + id);
  } 
}
