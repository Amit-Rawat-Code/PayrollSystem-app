import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalaryStructure } from '../Models/salary-structure';
import { Employee } from '../Models/employee';
import { SalaryStructureServices } from '../services/salary-structure-services';
import { EmployeeService } from '../services/employee-service';
import { ToastrService } from 'ngx-toastr';
import { CustomValidator } from '../Validators/custom-validator';

@Component({
  selector: 'app-salary-structure-component',
  standalone: false,
  templateUrl: './salary-structure-component.html',
  styleUrl: './salary-structure-component.css',
})
export class SalaryStructureComponent {
  salaryStructureForm!:FormGroup;
  empSalStructList:SalaryStructure[]=[];
  employeeList:Employee[]=[];

  /**
   *
   */
  constructor(private empSalStructService:SalaryStructureServices,
        private fb:FormBuilder,
        private empService:EmployeeService,
        private toast:ToastrService
      ) {  }

  ngOnInit(){
    this.InitializeSalaryStructureForm();
  }

  InitializeSalaryStructureForm(){
    this.salaryStructureForm=this.fb.group({
      SalaryStructureId:[0],
      EmployeeId:[0,[Validators.required,CustomValidator.notZero]],
      Basic:[0.00,[Validators.required]],
      ConveyanceAllowance:[0.00,[Validators.required]],
      DA:[0.00,[Validators.required]],
      DailyRate:[0.00],
      HourlyRate:[0.00],
      HRA:[0.00],
      MedicalAllowance:[0.00],
      SalaryType:[0,[Validators.required,CustomValidator.notZero]],
      SpecialAllowance:[0.00],
      WorkingDaysPerMonth:[0,[Validators.required]],
      EffectiveFrom:[new Date(),[Validators.required]],
      IsActive:[true]
    })
    this.loadEmployeeList();
    this.loadEmployeeSalaryStructureList();
  }

  loadEmployeeSalaryStructureList(){
    this.empSalStructService.getSalaryStructureList().subscribe({
      next:(data)=>{
        if(data.Success){
          this.empSalStructList=data.Data;          
        }
        console.log(data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  loadEmployeeList(){
    this.empService.getAll().subscribe({
      next:(data)=>{
        this.employeeList=data;
        console.log(data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  get f(){
    return this.salaryStructureForm.controls;
  }

  resetForm(){
    this.salaryStructureForm.reset({
      SalaryStructureId:0,
      EmployeeId:0,
      Basic:0.00,
      ConveyanceAllowance:0.00,
      DA:0.00,
      DailyRate:0.00,
      HourlyRate:0.00,
      HRA:0.00,
      MedicalAllowance:0.00,
      SalaryType:0,
      SpecialAllowance:0.00,
      WorkingDaysPerMonth:0,
      EffectiveFrom:new Date(),
      IsActive:true
    })
  }

  editSalaryStructureForm(salStruct:SalaryStructure){    
    const withFormattedDate={
      ...salStruct,
      EffectiveFrom:this.formatDate(salStruct.EffectiveFrom)
    }
    this.salaryStructureForm.patchValue(withFormattedDate);
    this.salaryStructureForm.markAllAsTouched();
    this.salaryStructureForm.markAsDirty();
  }

  formatDate(date:any):string{
    if(!date) return ''
    const d = new Date(date);
    const month = ('0'+ (d.getMonth()+1)).slice(-2);
    const day = ('0'+d.getDate()).slice(-2);

    return `${d.getFullYear()}-${month}-${day}`;
  }

  SaveSalaryStructure(){
    if(this.salaryStructureForm.invalid)
      return;
    const salStruct=this.salaryStructureForm.value;
    const salStructId = salStruct.SalaryStructureId;
    if(salStructId == 0){
      this.empSalStructService.addSalaryStructure(salStruct).subscribe({
        next:(data)=>{
          if(data.Success){
            this.toast.success(data.Message,"Success");
            this.resetForm();
            this.loadEmployeeSalaryStructureList();
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
      this.empSalStructService.updateSalaryStructure(salStructId,salStruct).subscribe({
        next:(data)=>{
          if(data.Success){
            this.toast.success(data.Message,"Success");
            this.resetForm();
            this.loadEmployeeSalaryStructureList();
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
    this.selectedId=this.salaryStructureForm.value.SalaryStructureId;
    this.modalConfig={
      isModalOpen:true,
      title:'Confirm Delete',
      message:'Are you sure you want to delete?',
      type:'confirm'
    }
  }

  deleteEmpSalaryStructre(){
    if(!!this.selectedId){
      this.empSalStructService.deleteSalaryStructure(this.selectedId).subscribe({
        next:(data)=>{
          if(data.Success){
            this.toast.success(data.Message,"Success");
            this.resetForm();
            this.loadEmployeeSalaryStructureList();
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
    this.deleteEmpSalaryStructre();
  }
}
