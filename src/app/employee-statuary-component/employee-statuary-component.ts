import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../Models/employee';
import { EmployeeStatuary } from '../Models/employee-statuary';
import { EmployeeStatuaryServices } from '../services/employee-statuary-services';
import { CustomValidator } from '../Validators/custom-validator';
import { EmployeeService } from '../services/employee-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-statuary-component',
  standalone: false,
  templateUrl: './employee-statuary-component.html',
  styleUrl: './employee-statuary-component.css',
})
export class EmployeeStatuaryComponent {
public empStatuaryForm!:FormGroup;
public employeeList:Employee[]=[];
public empStatuaryList:EmployeeStatuary[]=[];

/**
 *
 */
constructor(private fb:FormBuilder,
  private empStatuaryService:EmployeeStatuaryServices,
  private empService:EmployeeService,
  private toast:ToastrService) {}

  ngOnInit(){
    this.InitializeForm();
  }

InitializeForm(){
  this.empStatuaryForm=this.fb.group({
    StatutoryId:[0],
    EmployeeId:[0,[Validators.required,CustomValidator.notZero]],
    IsPfApplicable:[false],
    UAN:[''],
    PFAccountNo:[''],
    IsEsiApplicable:[false],
    EsiNo:[''],
    EffectiveFrom:[new Date()],
    IsActive:[true]
  })
  this.loadEmployeeStatuaryList();
  this.loadEmployeeList();
}

get f(){
  return this.empStatuaryForm.controls;
}

loadEmployeeList(){
  this.empService.getAll().subscribe({
    next:(data)=>{
      this.employeeList=data;
      console.log(data);
    }
  })
}
loadEmployeeStatuaryList(){
  this.empStatuaryService.getEmployeeStatuaryList().subscribe({
    next:(data)=>{
      if(data.Success){
        this.empStatuaryList=data.Data;
        console.log(data);
      }
    }
  })
}
resetForm(){
  this.empStatuaryForm.reset({
    StatutoryId:0,
    EmployeeId:0,
    IsPfApplicable:false,
    UAN:'',
    PFAccountNo:'',
    IsEsiApplicable:false,
    EsiNo:'',
    EffectiveFrom:new Date(),
    IsActive:true
  })
}
editEmployeeStatuary(empStat:EmployeeStatuary){
  const withFormattedDate={
      ...empStat,
      EffectiveFrom:this.formatDate(empStat.EffectiveFrom)
    }
  this.empStatuaryForm.patchValue(withFormattedDate);
  this.empStatuaryForm.markAsDirty();
  this.empStatuaryForm.markAllAsTouched();
}

formatDate(date: any): string {
  if (!date) return '';

  const d = new Date(date);
  const month = ('0' + (d.getMonth() + 1)).slice(-2);
  const day = ('0' + d.getDate()).slice(-2);

  return `${d.getFullYear()}-${month}-${day}`;
}

SaveEmployeeStatuaryForm(){
  if(this.empStatuaryForm.invalid)
    return;
  const statuary = this.empStatuaryForm.value;
  const statuaryId = statuary.StatutoryId;
  if(statuaryId == 0)
  {
    this.empStatuaryService.addEmployeeStatuary(statuary).subscribe({
      next:(data)=>{
        if(data.Success){
          this.toast.success(data.Message,"Success");
          this.resetForm();
          this.loadEmployeeStatuaryList();
        }
        console.log(data);
      },
      error:(err)=>{
        this.toast.error("something went wrong","Error");
        console.log(err);
      }
    })
  }
  else{
    this.empStatuaryService.updateEmployeeStatuary(statuaryId,statuary).subscribe({
      next:(data)=>{
        if(data.Success){
          this.toast.success(data.Message,"Success");
          this.resetForm();
          this.loadEmployeeStatuaryList();
        }
        console.log(data);
      },
      error:(err)=>{
        this.toast.error("something went wrong","Error");
        console.log(err);
      }
    })
  }
}

selectedId:number|null=null;

modalConfig = {
  isModalOpen: false,
  title: '',
  message: '',
  type: 'confirm' as 'success' | 'error' | 'confirm'
  };

  openDeleteModal(){
    this.selectedId=this.empStatuaryForm.value.StatutoryId;
    this.modalConfig={
      isModalOpen:true,
      title:'Confirm Delete',
      message:'Are you sure you want to delete?',
      type:'confirm'
    }
  }

  deleteEmployeeStatuary(){
    if(!!this.selectedId){
      this.empStatuaryService.deleteEmployeeStatuary(this.selectedId).subscribe({
        next:(data)=>{
          if(data.Success){
            this.toast.success(data.Message,"Success");
            this.resetForm();
            this.loadEmployeeStatuaryList();
            this.handleClose();
            this.selectedId=0;
          }
        }
      })
    }
  }
  handleClose(){
    this.modalConfig={
      isModalOpen:false,
      title:'',
      message:'',
      type: 'confirm' as 'success' | 'error' | 'confirm'
    }
  }
  handleConfirm(){
    this.deleteEmployeeStatuary();
  }
}
