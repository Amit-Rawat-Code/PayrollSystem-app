import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DesignationService } from '../services/designation-service';
import { Designation } from '../Models/designation';
import { Department } from '../Models/department';
import { DepartmentService } from '../services/department-service';

@Component({
  selector: 'app-desigantion.component',
  standalone: false,
  templateUrl: './desigantion.component.html',
  styleUrl: './desigantion.component.css',
})
export class DesigantionComponent {
designationForm!:FormGroup;
designation:Designation[]=[];
department:Department[]=[];
hasValue:boolean=false;
/**
 *
 */
constructor(private fb:FormBuilder,
  private desgnationService:DesignationService,
  private departmentService:DepartmentService,
  private cdr:ChangeDetectorRef) {}

ngOnInit(){
  this.InitializeForm();
  this.loadDepartmentList();
  this.loadDesignation();
}

InitializeForm(){
  this.designationForm=this.fb.group({
    DesignationId:[0],
    DepartmentId:[0],
    DesignationName:[''],
    Description:[''],
    IsActive:[true],
    CreatedOn:[new Date()],
    CreatedBy:[1],
    UpdatedOn:[null],
    UpdatedBy:[null]
  });
  this.designationForm.valueChanges.subscribe(val=> {
    this.hasValue=Object.values(val).some(v=> v!==null && v!=='' && v!==0);
  });
}

loadDepartmentList(){
  this.departmentService.getDepartments().subscribe({
    next:(data)=>{
      if(data.Success){
        this.department=data.Data;
      }
      else
      {
        console.log(data);
      }
      console.log(data);
    }
  })
}

loadDesignation(){
  this.desgnationService.getAllDesignation().subscribe({
    next:(data)=>{
      if(data.Success){
        this.designation=data.Data;
      }
      else{
        console.log(data);
      }
      console.log(data);
    }
  })
}
SaveDesignation(){
  if(this.designationForm.invalid)
    return
  const desn =this.designationForm.value;
  if(desn.DepartmentId==0){
    this.desgnationService.AddDesignation(this.designationForm.value).subscribe({
    next:(data)=>{
      if(data.Success){
        this.cdr.detectChanges();
        this.loadDesignation();
        this.ResetForm();
      }
      console.log(data);
    }
  })
  }
  else{
    this.desgnationService.updateDesignation(desn.DesignationId,desn).subscribe({
      next:(data)=>{
        if(data.Success){
          this.loadDesignation();
          this.ResetForm();
        }
        console.log(data);
      }
    })
  }
  
}
EditDesignation(desn:Designation){
this.designationForm.patchValue(desn);
}

selectedId:number|null=null;
  isModelOpen=false;
  openDelete(){
    const desn=this.designationForm.value;
    this.selectedId=desn.DesignationId;
    this.isModelOpen=true;
  }

DeleteDesignation(){
if(!!this.selectedId){
  this.desgnationService.deleteDesignation(this.selectedId).subscribe({
    next:(data)=>{
      if(data.Success){
        this.loadDesignation();
        this.ResetForm();
        this.isModelOpen=false;
        this.selectedId=null;
      }
    }
  })
}
}

ResetForm(){
this.InitializeForm();
}

}
