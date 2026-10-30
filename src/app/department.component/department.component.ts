import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Department } from '../Models/department';
import { DepartmentService } from '../services/department-service';

@Component({
  selector: 'app-department.component',
  standalone: false,
  templateUrl: './department.component.html',
  styleUrl: './department.component.css',
})
export class DepartmentComponent {
departmentForm!:FormGroup;
departments:Department[]=[];

/**
 *
 */
constructor(private fb:FormBuilder,private departmentService:DepartmentService) {}

ngOnInit():void{
  this.departmentForm=this.fb.group({
    DepartmentId:[0],
    DepartmentName:[''],
    Description:[''],
    IsActive:[true],
    CreatedOn:[new Date()],
    CreatedBy:[1],
    UpdatedOn:[null],
    UpdatedBy:[null]
  }) ;
  this.loadDepartments();
}
loadDepartments(){
    this.departmentService.getDepartments().subscribe({
      next:(data)=>{
        if(data.Success){
          this.departments=data.Data;          
        }        
        else{
          console.log(data);
        }
        console.log(data);
      }
    });
  }
  saveDepartment(){
    if(this.departmentForm.invalid)
      return
    const dept=this.departmentForm.value;
    if(dept.DepartmentId==0){
      this.departmentService.addDepartment(dept).subscribe({
        next:(data)=>{
          if(data.Success){
            this.loadDepartments();
            this.departmentForm.reset();
          }
          else{
          console.log(data);
          }
          console.log(data);          
        }
      });
    }
    else{
      this.departmentService.updateDepartment(dept.DepartmentId,dept).subscribe({
        next:(data)=>{
          if(data.Success){
            this.loadDepartments();
            this.departmentForm.reset();
          }
          else{
          console.log(data);            
          }
          console.log(data);          
        }
      })
    }
  }
  editDepartment(dept:Department){
    this.departmentForm.patchValue(dept);
  }
  deleteDepartment(id:Number){
    this.departmentService.deleteDepartment(id).subscribe({
      next:(data)=>{
        if(data.Success){          
          this.loadDepartments();
        }        
        else{
          console.log(data);
        }
        console.log(data);
      }
    })
  }
}
