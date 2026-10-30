import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../api-response';
import { EmployeeBankDetail } from '../Models/employee-bank-detail';

@Injectable({
  providedIn: 'root',
})
export class EmployeeBankDetailServices {
  private baseUrl=environment.apiBaseUrl;
  private apiUrl=this.baseUrl+"/EmployeeBankDetail";

  /**
   *
   */
  constructor(private http:HttpClient) {  }

  getEmployeeBankDetail():Observable<ApiResponse<EmployeeBankDetail[]>>{
    return this.http.get<ApiResponse<EmployeeBankDetail[]>>(this.apiUrl);
  }
  
  getEmployeeBankDetailById(id:Number):Observable<ApiResponse<EmployeeBankDetail>>{
    return this.http.get<ApiResponse<EmployeeBankDetail>>(`${this.apiUrl}/${id}`);
  }

  addEmployeeBankDetail(empBnkDetail:EmployeeBankDetail):Observable<ApiResponse<EmployeeBankDetail>>{
    return this.http.post<ApiResponse<EmployeeBankDetail>>(this.apiUrl,empBnkDetail);
  }

  updateEmployeeBankDetail(id:Number,empBnkDetail:EmployeeBankDetail):Observable<ApiResponse<EmployeeBankDetail>>{
    return this.http.put<ApiResponse<EmployeeBankDetail>>(`${this.apiUrl}/${id}`,empBnkDetail);
  }

  deleteEmployeeBankDetail(id:Number):Observable<ApiResponse<EmployeeBankDetail>>{
    return this.http.delete<ApiResponse<EmployeeBankDetail>>(`${this.apiUrl}/${id}`);
  }
}
