import { Component } from '@angular/core';
import { EmployeeSalaryTransaction } from '../Models/employee-salary-transaction';
import { EmployeeSalaryTransactionServices } from '../services/employee-salary-transaction-services';
import { Department } from '../Models/department';
import { DepartmentService } from '../services/department-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-salary-transaction-component',
  standalone: false,
  templateUrl: './employee-salary-transaction-component.html',
  styleUrl: './employee-salary-transaction-component.css',
})
export class EmployeeSalaryTransactionComponent {
employeesSalLis:EmployeeSalaryTransaction[]=[];
departmentList:Department[]=[];
deptId:number=0;
month:number=0;
year:number=0;
loading=false;
/**
 *
 */
constructor(private empSalTransService:EmployeeSalaryTransactionServices,
            private departmentService:DepartmentService,
            private toast:ToastrService
            ) {}

ngOnInit(){
  this.getDepartmentList();
}

loadEmployeeSalary(){
  if(!this.year || !this.month || !this.deptId){
    return;
  }
  this.getEmployeeSalaryList();
}

getEmployeeSalaryList(){
  this.empSalTransService.getEmployeeSalaryDetpartmentWise(this.deptId,this.month,this.year).subscribe({
    next:(data)=>{
      if(data.Success){
        this.employeesSalLis=data.Data;
      }
      console.log(data);
    },
    error:(err)=>{
      console.log(err);
    }
  })
}

getDepartmentList(){
  this.departmentService.getDepartments().subscribe({
    next:(data)=>{
      if(data.Success){
        this.departmentList = data.Data;
      }
    }
  })
}

calculateSalary(){
  this.loading = true;

    this.empSalTransService
      .calculateEmployeeSalary(this.employeesSalLis, this.month, this.year)
      .subscribe({
        next: (res) => {
          if(res.Success){
            this.employeesSalLis = res.Data; // assuming ApiSuccess wraps in { data }
            this.loading = false;
          }          
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
}

}
