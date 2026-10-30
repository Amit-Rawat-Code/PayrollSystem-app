import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../api-response';
import { SalaryStructure } from '../Models/salary-structure';

@Injectable({
  providedIn: 'root',
})
export class SalaryStructureServices {
  private baseUrl=environment.apiBaseUrl;
  private apiUrl=this.baseUrl+'/EmployeeSalaryStructure';

  /**
   *
   */
  constructor(private http:HttpClient) {  }

  getSalaryStructureList():Observable<ApiResponse<SalaryStructure[]>>{
    return this.http.get<ApiResponse<SalaryStructure[]>>(this.apiUrl);
  }

  getSalaryStructureById(id:Number):Observable<ApiResponse<SalaryStructure>>{
    return this.http.get<ApiResponse<SalaryStructure>>(this.apiUrl);
  }

  addSalaryStructure(salStruct:SalaryStructure):Observable<ApiResponse<SalaryStructure>>{
    return this.http.post<ApiResponse<SalaryStructure>>(this.apiUrl,salStruct);
  }

  updateSalaryStructure(id:Number,salStruct:SalaryStructure):Observable<ApiResponse<SalaryStructure>>{
    return this.http.put<ApiResponse<SalaryStructure>>(`${this.apiUrl}/${id}`,salStruct);
  }

  deleteSalaryStructure(id:Number):Observable<ApiResponse<any>>{
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }
}
