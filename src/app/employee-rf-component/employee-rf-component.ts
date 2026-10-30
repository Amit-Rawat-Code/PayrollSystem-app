import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators, FormArray } from '@angular/forms';
import { Employee } from '../Models/employee';
import { EmployeeService } from '../services/employee-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-rf-component',
  standalone: false,
  templateUrl: './employee-rf-component.html',
  styleUrl: './employee-rf-component.css',
})
export class EmployeeRfComponent implements OnInit {

  employeeFormGroup!: FormGroup<{
    employeeName: FormControl<string>;
    empCode: FormControl<string>;
    mobile: FormControl<string>;
    gender: FormControl<string>;
    dob: FormControl<Date>;
    address: FormControl<string>;
    isManager: FormControl<boolean | null>;
    image: FormControl<File | null>;
  }>;

  /**
   *
   */
  constructor(private employeeService:EmployeeService,private router:Router,private cdr:ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.initializeForm();
  }

  // -----------------------------------------
  // FORM INITIALIZATION
  // -----------------------------------------
  private initializeForm(): void {
    this.employeeFormGroup = new FormGroup({
      employeeName: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ]
      }),
      empCode: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.required
        ]
      }),
      mobile: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.required
        ]
      }),
      gender: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      dob: new FormControl<Date>(new Date(), {
        nonNullable: true,
        validators: [Validators.required]
      }),
      address: new FormControl<string>('', {
        nonNullable:true,
        validators: [Validators.required]
      }),
      isManager: new FormControl<boolean>(false),
      image: new FormControl<File | null>(null)
    });
  }

  // -----------------------------------------
  // GETTERS
  // -----------------------------------------
  get f() {
    return this.employeeFormGroup.controls;
  }

  // -----------------------------------------
  // MAPPING METHOD (Form → Model)
  // -----------------------------------------
  private mapFormToEmployee(): Employee {
    const formValue = this.employeeFormGroup.getRawValue();

    return new Employee(
      0,
      formValue.empCode,
      formValue.employeeName,
      formValue.dob,
      formValue.mobile,
      formValue.gender,      
      formValue.address,
      formValue.isManager??undefined,
      formValue.image
    );
  }

  // -----------------------------------------
  // SAVE METHOD
  // -----------------------------------------
  Save(): void {

    if (this.employeeFormGroup.invalid) {
      this.employeeFormGroup.markAllAsTouched();
      return;
    }

    const employee = this.mapFormToEmployee();

    console.log('Mapped Employee Model:', employee);

    const value = this.employeeFormGroup.getRawValue();

    const formData=new FormData();
    formData.append('EmployeeName',value.employeeName);
    formData.append('EmpCode',value.empCode);
    formData.append('Mobile',value.mobile);
    formData.append('DOB',String(value.dob));
    formData.append('Gender',value.gender);
    formData.append('Address',value.address);
    formData.append('IsManager',String(value.isManager));
    if(value.image){
      formData.append('Image',value.image);
    }

    // Here you would call service:
    this.employeeService.create(formData).subscribe({
      next:(res)=>{
        console.log('Employee saved successfully',res);
        this.employeeService.triggerRefresh();
        this.resetForm();
      },
      error:(err)=>{
        console.log('Error saving employee',err);
      }
    })
    this.router.navigate(['/emp-list']);
  }
  
  previewUrl:string | ArrayBuffer | null = null;
  onFileSelected(e:any){
    const input=e.target as HTMLInputElement;
    if(!input.files|| input.files.length === 0) return

    const file = input.files[0];
    this.f.image.setValue(file);
    //Preview
    const reader = new FileReader();
    reader.onload=()=>{
      this.previewUrl=reader.result;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  private resetForm(): void {
  this.employeeFormGroup.reset();
}
}
