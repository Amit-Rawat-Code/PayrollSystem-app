import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { EmployeeComponent } from './employee-component/employee-component';
import { EmployeeRfComponent } from './employee-rf-component/employee-rf-component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ViewChildComponent } from './practice/view-child-component/view-child-component';
import { EmployeeList } from './employee-list/employee-list';
import { EmployeeEdit } from './employee-edit/employee-edit';
import { loaderInterceptor } from './interceptors/loader-interceptor';
import { LoaderComponent } from './loader-component/loader-component';
import { ModalComponent } from './modal-component/modal-component';
import { DepartmentComponent } from './department.component/department.component';
import { DesigantionComponent } from './desigantion.component/desigantion.component';
import { EmpOfficialDetailComponent } from './emp-official-detail-component/emp-official-detail-component';
import { ToastrModule } from 'ngx-toastr';
import { EmployeeBankDetailComponent } from './employee-bank-detail-component/employee-bank-detail-component';
import { EmployeeStatuaryComponent } from './employee-statuary-component/employee-statuary-component';
import { SalaryStructureComponent } from './salary-structure-component/salary-structure-component';
import { EmployeeSalaryTransactionComponent } from './employee-salary-transaction-component/employee-salary-transaction-component';

@NgModule({
  declarations: [
    App,
    EmployeeComponent,
    EmployeeRfComponent,
    ViewChildComponent,
    EmployeeList,
    EmployeeEdit,
    LoaderComponent,
    ModalComponent,
    DepartmentComponent,
    DesigantionComponent,
    EmpOfficialDetailComponent,
    EmployeeBankDetailComponent,
    EmployeeStatuaryComponent,
    SalaryStructureComponent,
    EmployeeSalaryTransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:'toast-top-right',
      timeOut:3000,
      closeButton:true,
      progressBar:true
    })
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([loaderInterceptor]))
  ],
  bootstrap: [App]
})
export class AppModule { }
