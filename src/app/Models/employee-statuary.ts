import {Common} from '../Models/common'
export interface EmployeeStatuary extends Common {
    StatutoryId:Number;
    EmployeeId:Number;
    EmployeeName:string;
    IsPfApplicable:boolean;
    UAN:string;
    PFAccountNo:string;
    IsEsiApplicable:boolean;
    EsiNo:string;
    EffectiveFrom:Date;
}
