import { Component } from '@angular/core';
import { EmployeeBankDetailServices } from '../services/employee-bank-detail-services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeBankDetail } from '../Models/employee-bank-detail';
import { Employee } from '../Models/employee';
import { EmployeeService } from '../services/employee-service';
import { CustomValidator } from '../Validators/custom-validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-bank-detail-component',
  standalone: false,
  templateUrl: './employee-bank-detail-component.html',
  styleUrl: './employee-bank-detail-component.css',
})
export class EmployeeBankDetailComponent {
  empBankDetailForm!:FormGroup;
  empBankDetailList:EmployeeBankDetail[]=[];
  employeeList:Employee[]=[];
  /**
   *
   */
  constructor(private fb:FormBuilder,
    private empBnkDetailService:EmployeeBankDetailServices,
    private empService:EmployeeService,
    private toast:ToastrService) {  }

    ngOnInit(){
      this.InitializeForm();
    }

  InitializeForm(){
    this.empBankDetailForm=this.fb.group({
      BankId:[0],
      EmployeeId:[0,[Validators.required,CustomValidator.notZero]],
      BankName:['',[Validators.required]],
      AccountNo:['',[Validators.required]],
      IFSC:['',[Validators.required]],
      PAN:[''],
      Aadhaar:['',[Validators.required]],
      PaymentMode:['Online',[Validators.required]],
      IsActive:[true]
    })
    this.loadEmployeeList();
    this.loadEmployeeBankDetailList();    
  }

  loadEmployeeList(){
    this.empService.getAll().subscribe({
      next:(data)=>{
        this.employeeList=data;
        console.log(data);
      }      
    })
  }

  loadEmployeeBankDetailList(){
    this.empBnkDetailService.getEmployeeBankDetail().subscribe({
      next:(data)=>{
        if(data.Success){
          this.empBankDetailList=data.Data;
        }
        console.log(data);
      }
    })
  }

  get f(){
    return this.empBankDetailForm.controls;
  }

  editEmployeeBankDetail(empBnkDetail:EmployeeBankDetail){
    this.empBankDetailForm.patchValue({
      ...empBnkDetail
    });
  }
  resetForm(){
    this.empBankDetailForm.reset({
      BankId: 0,
      EmployeeId: 0,
      BankName: '',
      AccountNo: '',
      IFSC: '',
      PAN: '',
      Aadhaar: '',
      PaymentMode: 'Online',
      IsActive: true
    })
  }
  Save(){
    if(this.empBankDetailForm.invalid)
      return;
    const bnkDetail = this.empBankDetailForm.value
    if(bnkDetail.BankId == 0){
      this.empBnkDetailService.addEmployeeBankDetail(bnkDetail).subscribe({
        next:(data)=>{
          if(data.Success)
          {
            this.toast.success(data.Message,"Success");
            this.resetForm();
            this.loadEmployeeBankDetailList();
          }
          console.log(data);
        },
        error:(err)=>{
          this.toast.error(err,"Error");
          console.log(err);
        }
      })
    }
    else{
      this.empBnkDetailService.updateEmployeeBankDetail(bnkDetail.BankId,bnkDetail).subscribe({
        next:(data)=>{
          if(data.Success){
            this.toast.success(data.Message,"Success");
            this.resetForm();
            this.loadEmployeeBankDetailList();
          }
          console.log(data);
        },
        error:(err)=>{
          this.toast.error(err,"Error");
          console.log(err);
        }
      })
    }    
  }

  deleteEmpBnkDetail(){
    if(!!this.selectedId){
      this.empBnkDetailService.deleteEmployeeBankDetail(this.selectedId).subscribe({
        next:(data)=>{
          if(data.Success){          
            this.resetForm();
            this.handleClose();
            this.loadEmployeeBankDetailList();
            this.toast.success(data.Message,"Success");
          }
          console.log(data);
        },
        error:(err)=>{
          this.toast.error(err,"Error");
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

  openDelete(){
    const bnkDetail=this.empBankDetailForm.value;
    this.selectedId=bnkDetail.BankId;
    this.modalConfig = {
      isModalOpen: true,
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete?',
      type: 'confirm'
    };
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
    this.deleteEmpBnkDetail();
  }
}
