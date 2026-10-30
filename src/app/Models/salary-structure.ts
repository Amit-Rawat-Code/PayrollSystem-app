import {Common} from '../Models/common';

export interface SalaryStructure extends Common {
    SalaryStructureId:Number;
    EmployeeId:Number;
    EmployeeName:string;
    Basic:Number;
    ConveyanceAllowance:Number;
    DA:Number;
    DailyRate:Number;
    HourlyRate:Number;
    HRA:Number;
    MedicalAllowance:Number;
    SalaryType:Number;
    SpecialAllowance:Number;
    WorkingDaysPerMonth:Number;
    EffectiveFrom:Date;    
}
