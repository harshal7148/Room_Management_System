export class Tenant{
    name? : string;
    roomNo?:string;
    address?:string;
    uin?:string;
    profilePic?:File;
    //fd?:FormData;
    rentStartDate?:number;
    depositAmount?:number;
    isActive?:boolean = true; 
}