import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EmployeeOfficialDetail } from '../Models/employee-official-detail';
import { Observable } from 'rxjs';
import { ApiResponse } from '../api-response';

@Injectable({
  providedIn: 'root',
})
export class EmployeeOfficialDetailServices {
  private baseUrl=environment.apiBaseUrl;
  private apiUrl=this.baseUrl+"/EmployeeOfficialDetail";
  /**
   *
   */
  constructor(private http:HttpClient) {  }

  AddEmployeeOfficialDetail(empOffDetail:EmployeeOfficialDetail):Observable<ApiResponse<EmployeeOfficialDetail>>{
    return this.http.post<ApiResponse<EmployeeOfficialDetail>>(this.apiUrl,empOffDetail);
  }

  UpdateEmployeeOfficialDetail(id:Number,empOffDetail:EmployeeOfficialDetail):Observable<ApiResponse<EmployeeOfficialDetail>>{
    return this.http.put<ApiResponse<EmployeeOfficialDetail>>(`${this.apiUrl}/${id}`,empOffDetail);
  }

  DeleteEmployeeOfficialDetail(id:Number):Observable<ApiResponse<boolean>>{
    return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/${id}`);
  }

  GetEmployeeOfficialDetailList():Observable<ApiResponse<EmployeeOfficialDetail[]>>{
    return this.http.get<ApiResponse<EmployeeOfficialDetail[]>>(this.apiUrl);
  }

  GetEmployeeOfficialDetailById(id:Number):Observable<ApiResponse<EmployeeOfficialDetail>>{
    return this.http.get<ApiResponse<EmployeeOfficialDetail>>(`${this.apiUrl}/${id}`);
  }

  GetEmployeeListForManager():Observable<ApiResponse<EmployeeOfficialDetail[]>>{
    return this.http.get<ApiResponse<EmployeeOfficialDetail[]>>(`${this.apiUrl}/emp-list-of-manager`);
  }
}
