import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../Models/employee';
import { Department } from '../Models/department';
import { Designation } from '../Models/designation';
import { EmployeeOfficialDetailServices } from '../services/employee-official-detail-services';
import { EmployeeService } from '../services/employee-service';
import { DepartmentService } from '../services/department-service';
import { DesignationService } from '../services/designation-service';
import { EmployeeOfficialDetail } from '../Models/employee-official-detail';
import { CustomValidator } from '../Validators/custom-validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-emp-official-detail-component',
  standalone: false,
  templateUrl: './emp-official-detail-component.html',
  styleUrl: './emp-official-detail-component.css',
})
export class EmpOfficialDetailComponent {
  empOfficialDetailForm!:FormGroup;
  empOfficialDetailList:EmployeeOfficialDetail[]=[];
  employeeList:Employee[]=[];
  departmentList:Department[]=[];
  designationList:Designation[]=[];
  empListForManager:EmployeeOfficialDetail[]=[];
  hasValue:boolean=false;

  /**
   *
   */
  constructor(private empOfficialDetailService:EmployeeOfficialDetailServices,
    private empService:EmployeeService,
    private departService:DepartmentService,
    private designationService:DesignationService,
    private fb:FormBuilder,
    private toastr:ToastrService
  ) {  }
  ngOnInit(){
    this.InitializeForm();    
  }
  InitializeForm(){
    this.empOfficialDetailForm=this.fb.group({
      EmpOfficeId:[0],
      EmployeeId:[0,[Validators.required,CustomValidator.notZero]],
      DepartmentId:[0,[Validators.required,CustomValidator.notZero]],
      DesignationId:[0,[Validators.required,CustomValidator.notZero]],
      DOJ:[null,[Validators.required]],
      EmploymentType:['',[Validators.required]],
      ReportingManagerId:[0]
    });
    this.empOfficialDetailForm.valueChanges.subscribe(val=> {
    this.hasValue=Object.values(val).some(v=> v!==null && v!=='' && v!==0);
    });
    this.loadEmployeeList();
    this.loadDepartmentList();
    this.loadDesignationList();
    this.loadEmployeeListForManager();
    this.loadEmployeeOfficialDetailList();
  }

  get f(){
    return this.empOfficialDetailForm.controls;
  }

  loadEmployeeList(){
    this.empService.getAll().subscribe({
      next:(data)=>{
        this.employeeList=data;
        console.log(data);
      }      
    })
  }
  loadDepartmentList(){
    this.departService.getDepartments().subscribe({
      next:(data)=>{
        if(data.Success){
          this.departmentList=data.Data;
        }
        console.log(data);
      }
    })
  }
  loadDesignationList(){
    this.designationService.getAllDesignation().subscribe({
      next:(data)=>{
        if(data.Success){
          this.designationList=data.Data;
        }
        console.log(data);
      }
    })
  }
  loadEmployeeOfficialDetailList(){
    this.empOfficialDetailService.GetEmployeeOfficialDetailList().subscribe({
      next:(data)=>{
        if(data.Success){
          this.empOfficialDetailList=data.Data;
        }
        console.log(data);
      }
    })
  }

  loadEmployeeListForManager(){
    this.empOfficialDetailService.GetEmployeeListForManager().subscribe({
      next:(data)=>{
        if(data.Success){
          this.empListForManager = data.Data;
        }
        console.log(data);
      }
    })
  }

  SaveForm(){
    let empOffId;
    if(this.empOfficialDetailForm.invalid)
      return
    empOffId=this.empOfficialDetailForm.value.EmpOfficeId;
    if(empOffId==0){
      this.empOfficialDetailService.AddEmployeeOfficialDetail(this.empOfficialDetailForm.value).subscribe({
        next:(data)=>{
          if(data.Success){
            this.toastr.success(data.Message,'Success');
            this.InitializeForm();
          }
          else{
            // this.modalConfig={
            //   isModalOpen:true,
            //   title: 'Error',
            //   message: data.Message,
            //   type: 'error'
            // }
            this.toastr.error(data.Message,'Error');
          }
          console.log(data);
        }
      })
    }
    else
    {
      this.empOfficialDetailService.UpdateEmployeeOfficialDetail(empOffId,this.empOfficialDetailForm.value).subscribe({
        next:(data)=>{
          if(data.Success){
            this.toastr.success(data.Message,'Success');
            this.ResetForm();
          }
          console.log(data);
        }
      })
    }
  }
  ResetForm(){
    this.InitializeForm();
  }

  EditEmployeeOffDetail(empOff:EmployeeOfficialDetail){
    const withFormattedDate={
      ...empOff,
      DOJ:this.formatDate(empOff.DOJ)
    }
    this.empOfficialDetailForm.patchValue(withFormattedDate);
  }

  formatDate(date: any): string {
  if (!date) return '';

  const d = new Date(date);
  const month = ('0' + (d.getMonth() + 1)).slice(-2);
  const day = ('0' + d.getDate()).slice(-2);

  return `${d.getFullYear()}-${month}-${day}`;
}

  selectedId:number|null=null;

  modalConfig = {
  isModalOpen: false,
  title: '',
  message: '',
  type: 'confirm' as 'success' | 'error' | 'confirm'
};

  openDelete(){
    const desn=this.empOfficialDetailForm.value;
    this.selectedId=desn.DesignationId;
    this.modalConfig = {
      isModalOpen: true,
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete?',
      type: 'confirm'
    };
  }

DeleteEmpOfficialDetail(){
if(!!this.selectedId){
  this.empOfficialDetailService.DeleteEmployeeOfficialDetail(this.selectedId).subscribe({
    next:(data)=>{
      if(data.Success){
        this.InitializeForm();
        this.modalConfig = {
        isModalOpen: false,
        title: '',
        message: '',
        type: 'confirm' as 'success' | 'error' | 'confirm'
      };
        this.selectedId=null;
      }
    }
  })
}
}

handleClose(){
  this.modalConfig={
    isModalOpen:false,
    title: '',
    message: '',
    type: 'confirm' as 'success' | 'error' | 'confirm'
  }
}
handleConfirm(){
  this.DeleteEmpOfficialDetail();
}
}
