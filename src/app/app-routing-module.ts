import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee-component/employee-component';
import { EmployeeRfComponent } from './employee-rf-component/employee-rf-component';
import { ViewChildComponent } from './practice/view-child-component/view-child-component';
import { EmployeeList } from './employee-list/employee-list';
import { EmployeeEdit } from './employee-edit/employee-edit';
import { DepartmentComponent } from './department.component/department.component';
import { DesigantionComponent } from './desigantion.component/desigantion.component';
import { EmpOfficialDetailComponent } from './emp-official-detail-component/emp-official-detail-component';
import { EmployeeBankDetailComponent } from './employee-bank-detail-component/employee-bank-detail-component';
import { EmployeeStatuaryComponent } from './employee-statuary-component/employee-statuary-component';
import { SalaryStructureComponent } from './salary-structure-component/salary-structure-component';
import { EmployeeSalaryTransactionComponent } from './employee-salary-transaction-component/employee-salary-transaction-component';

const routes: Routes = [
  {path:'',redirectTo:'emp-list',pathMatch:'full'},
  {path:'emp-list',component:EmployeeList,data:{title:'Employee List'}},
  {path:'add-employee',component:EmployeeRfComponent,data:{title:'Add Employee'}},
  {path:'emp-edit/:id',component:EmployeeEdit,data:{title:'Edit Employee'}},
  {path:'dept-list',component:DepartmentComponent,data:{title:'Department List'}},
  {path:'desn-list',component:DesigantionComponent,data:{title:'Designation List'}},
  {path:'emp-offDetail-list',component:EmpOfficialDetailComponent,data:{title:'Employee Official Detail List'}},
  {path:'emp-bnkDetail-list',component:EmployeeBankDetailComponent,data:{title:'Employee Bank Detail List'}},
  {path:'emp-statuary-list',component:EmployeeStatuaryComponent,data:{title:'Employee Statuary List'}},
  {path:'emp-salstruct-list',component:SalaryStructureComponent,data:{title:'Employee Salary Structure'}},
  {path:'emp-saltrans-list',component:EmployeeSalaryTransactionComponent,data:{title:'Employee Salary Transaction'}}
  // {path:'',component:ViewChildComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
