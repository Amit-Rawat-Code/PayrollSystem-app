import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../api-response';
import { EmployeeSalaryTransaction } from '../Models/employee-salary-transaction';

@Injectable({
  providedIn: 'root',
})
export class EmployeeSalaryTransactionServices {
  private baseUrl=environment.apiBaseUrl;
  private apiUrl=this.baseUrl+'/EmployeeSalaryTransaction';

  /**
   *
   */
  constructor(private http:HttpClient) {  }

  getEmployeeSalaryDetpartmentWise(deptId:number,month:number,year:number):Observable<ApiResponse<EmployeeSalaryTransaction[]>>{
    let params = new HttpParams().set('deptId',deptId).set('month',month).set('year',year);
    return this.http.get<ApiResponse<EmployeeSalaryTransaction[]>>(`${this.apiUrl}/department-salary`,{params});
  }

  calculateEmployeeSalary(salaryList:EmployeeSalaryTransaction[],month:number,year:number):Observable<ApiResponse<EmployeeSalaryTransaction[]>>{
    let params = new HttpParams().set('month',month).set('year',year);
    return this.http.post<ApiResponse<EmployeeSalaryTransaction[]>>(`${this.apiUrl}/calculate-salary`,salaryList,{params});
  }
  
}
