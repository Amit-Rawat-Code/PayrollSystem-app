import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../api-response';
import { EmployeeStatuary } from '../Models/employee-statuary';

@Injectable({
  providedIn: 'root',
})
export class EmployeeStatuaryServices {
  private baseUrl=environment.apiBaseUrl;
  private apiUrl = this.baseUrl+'/EmployeeStatuary'

  /**
   *
   */
  constructor(private http:HttpClient) {  }

  getEmployeeStatuaryList():Observable<ApiResponse<EmployeeStatuary[]>>{
    return this.http.get<ApiResponse<EmployeeStatuary[]>>(this.apiUrl);
  }

  getEmployeeStatuaryById(id:Number):Observable<ApiResponse<EmployeeStatuary>>{
    return this.http.get<ApiResponse<EmployeeStatuary>>(`${this.apiUrl}/${id}`);
  }

  addEmployeeStatuary(empStatuary:EmployeeStatuary):Observable<ApiResponse<EmployeeStatuary>>{
    return this.http.post<ApiResponse<EmployeeStatuary>>(this.apiUrl,empStatuary);
  }

  updateEmployeeStatuary(id:Number,empStatuary:EmployeeStatuary):Observable<ApiResponse<EmployeeStatuary>>{
    return this.http.put<ApiResponse<EmployeeStatuary>>(`${this.apiUrl}/${id}`,empStatuary);
  }

  deleteEmployeeStatuary(id:Number):Observable<ApiResponse<EmployeeStatuary>>{
    return this.http.delete<ApiResponse<EmployeeStatuary>>(`${this.apiUrl}/${id}`);
  }

}
