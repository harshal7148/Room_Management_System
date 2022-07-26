import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class DateUtilService{
    constructor(){

    }
    // conver date into millisecond - return date in timestamp
    dateInMillisecond(date:any){
        if(date){
            const dateInMillisecond:Date  = date;
            return dateInMillisecond.getTime();
        }
        return;
    }
}

function providedIn(providedIn: any, arg1: string) {
    throw new Error("Function not implemented.");
}
