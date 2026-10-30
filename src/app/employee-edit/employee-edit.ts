import { ChangeDetectorRef, Component } from '@angular/core';
import { EmployeeService } from '../services/employee-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../Models/employee';

@Component({
  selector: 'app-employee-edit',
  standalone: false,
  templateUrl: './employee-edit.html',
  styleUrl: './employee-edit.css',
})
export class EmployeeEdit {
/**
 *
 */
employee:Employee={};
constructor(private employeeService:EmployeeService,private router:Router,private route:ActivatedRoute,private cdr:ChangeDetectorRef) {}
ngOnInit(){
  this.LoadEmployeeData();

}
LoadEmployeeData(){
  let id:number=0;
  this.route.paramMap.subscribe(param=>{
    id=Number(param.get('id'));
  })
  this.employeeService.getById(id).subscribe(res=>{
    this.employee=res;
    this.cdr.detectChanges();
  })
}
Update(EditForm:any){
  this.employee=EditForm;
  this.employeeService.update(EditForm.employeeId,this.employee).subscribe(res=>{
    console.log(res);
    this.router.navigate(["/emp-list"]);
  })
  // console.log(EditForm);
  // console.log(this.selectedHobbies);
}
}
