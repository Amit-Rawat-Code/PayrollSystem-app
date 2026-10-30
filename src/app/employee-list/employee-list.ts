import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeService } from '../services/employee-service';
import { Employee } from '../Models/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: false,
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {
  /**
   *
   */
  constructor(private empservice:EmployeeService,private cdr:ChangeDetectorRef,private router:Router) {  }
  ngOnInit(): void {
    this.notify.emit('Employee List');
    this.getEmployeeList();
    this.empservice.refres$.subscribe(()=>{
      this.getEmployeeList();
    })
  }

  @Output() notify = new EventEmitter<string>  

  public empList:Employee[]=[];

  getEmployeeList():void{
    this.empservice.getAll().subscribe(res=>{
      this.empList=res;
      //this.cdr.detectChanges();
      console.log(this.empList);
    })
  }
  selectedId:number|null=null;
  isModelOpen=false;
  openDelete(id:any){
    this.selectedId=id;
    this.isModelOpen=true;
  }

  deleteEmployee(){
    this.empservice.delete(Number(this.selectedId)).subscribe({
      next:()=>{
        this.isModelOpen=false;
        this.selectedId=null;
        this.empservice.triggerRefresh();
        this.router.navigate(['/emp-list']);
      },
      error:()=>{
        this.isModelOpen=false;
      }
    });
    this.isModelOpen=false;
  }

}
