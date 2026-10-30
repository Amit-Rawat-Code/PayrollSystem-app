import { Component } from '@angular/core';
import { Employee } from '../Models/employee';

@Component({
  selector: 'app-employee-component',
  standalone: false,
  templateUrl: './employee-component.html',
  styleUrl: './employee-component.css',
})
export class EmployeeComponent {
  selectedArray:string[]=[];
  emp = new Employee();
  /**
   *
   */
  constructor() {
  }
  onChange(e:any){
    let selectedValue=e.target.value;
    let checkedValue=e.target.checked;
    if(checkedValue){
      this.selectedArray.push(selectedValue);
    }
    else{
      let index = this.selectedArray.indexOf(selectedValue);
      this.selectedArray.splice(index,1);
    }
  }
Save(employeeForm:any){
console.log(this.emp);
console.log(this.selectedArray);
this.ResetForm(employeeForm);
}
ResetForm(employeeForm:any){
employeeForm.resetForm();
this.selectedArray=[];
}
}
