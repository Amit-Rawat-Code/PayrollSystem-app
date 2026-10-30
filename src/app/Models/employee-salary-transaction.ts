import {Common} from '../Models/common';

export interface EmployeeSalaryTransaction extends Common {
    SalaryTransactionId:Number;
    EmployeeId:Number;
    EmployeeName:string;
    Month:Number;
    Year:Number;
    PresentDays:Number;
    TotalHours:Number;
    PF:Number;
    ESI:Number;
    ProfessionalTax:Number;
    GrossSalary:Number;
    TotalDeduction:Number;
    NetSalary:Number;
    ProcessedOn:Date;
    SalaryType:number
}
