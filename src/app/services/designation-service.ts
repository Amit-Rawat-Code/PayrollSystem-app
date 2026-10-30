import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../api-response';
import { Designation } from '../Models/designation';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DesignationService {
  private baseUrl=environment.apiBaseUrl;
  private apiUrl=this.baseUrl+"/designation";
  /**
   *
   */
  constructor(private http:HttpClient) {  }

  getAllDesignation():Observable<ApiResponse<Designation[]>>{
    return this.http.get<ApiResponse<Designation[]>>(this.apiUrl);
  }

  getDesignationById(id:Number):Observable<ApiResponse<Designation>>{
    return this.http.get<ApiResponse<Designation>>(`${this.apiUrl}/${id}`);
  }

  AddDesignation(desn:Designation):Observable<ApiResponse<Designation>>{
    return this.http.post<ApiResponse<Designation>>(`${this.apiUrl}`,desn);
  }

  updateDesignation(id:Number,desn:Designation):Observable<ApiResponse<Designation>>{
    return this.http.put<ApiResponse<Designation>>(`${this.apiUrl}/${id}`,desn);
  }

  deleteDesignation(id:Number):Observable<ApiResponse<any>>{
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }
}
