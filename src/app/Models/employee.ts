export class Employee {
    /**
     *
     */
    constructor(
        public employeeId?:number,
        public empCode?:string,
        public employeeName? : string,
        public dob?:Date,
        public mobile? : string,
        public gender?:string,
        public address?:string,
        public isManager?:boolean,
        public image?:File | null,
        public isActive?:boolean
    ) {}
}
