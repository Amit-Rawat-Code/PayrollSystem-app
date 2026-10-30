import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Department } from '../Models/department';
import { ApiResponse } from '../api-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private baseUrl=environment.apiBaseUrl;
  private apiUrl=this.baseUrl+"/department";
  /**
   *
   */
  constructor(private http:HttpClient) {  }

  getDepartments():Observable<ApiResponse<Department[]>>{
    return this.http.get<ApiResponse<Department[]>>(this.apiUrl);
  }

  getDepartmentById(id:Number):Observable<ApiResponse<Department>>{
    return this.http.get<ApiResponse<Department>>(`${this.apiUrl}/${id}`);
  }

  addDepartment(department:Department):Observable<ApiResponse<Department>>{
    return this.http.post<ApiResponse<Department>>(this.apiUrl,department);
  }

  updateDepartment(id:Number,department:Department):Observable<ApiResponse<Department>>{
    return this.http.put<ApiResponse<Department>>(`${this.apiUrl}/${id}`,department);
  }
  deleteDepartment(id:Number):Observable<ApiResponse<any>>{
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }
}
