import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Models/employee';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl=environment.apiBaseUrl;
  private apiUrl=this.baseUrl+'/Employees';
/**
 *
 */
constructor(private http:HttpClient) {
}

// create(employee:Employee):Observable<Employee>{
//   return this.http.post<Employee>(this.apiUrl,employee);
// }
create(formData:FormData):Observable<Employee>{
  return this.http.post<Employee>(this.apiUrl,formData);
}

getAll():Observable<Employee[]>{
  return this.http.get<Employee[]>(this.apiUrl);
}

getById(id:number):Observable<Employee>{
  return this.http.get<Employee>(`${this.apiUrl}/${id}`);
}

update(id:number,employee:Employee):Observable<void>{
  return this.http.put<void>(`${this.apiUrl}/${id}`,employee);
}

delete(id:number):Observable<void>{
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

private refreshSubject = new Subject<void>();
refres$=this.refreshSubject.asObservable();

triggerRefresh(){
  this.refreshSubject.next();
}

}
