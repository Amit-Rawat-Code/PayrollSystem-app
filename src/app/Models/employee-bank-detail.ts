import {Common} from '../Models/common'
export interface EmployeeBankDetail extends Common {
    BankId:Number;
    EmployeeId:Number;
    EmployeeName:string;
    BankName:string;
    AccountNo:string;
    IFSC:string;
    PAN:string;
    Aadhaar:string;
    PaymentMode:string;    
}
