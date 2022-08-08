import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";

@Component({
    selector: 'date-cell-component',
    template: `
         
        <span> {{cellValue | date:'dd/MM/yyy'}} </span>
    `,
})
export class DateCellRender implements ICellRendererAngularComp{

    public cellValue!: any;

   // gets called once before the renderer is used
   agInit(params: ICellRendererParams): void {
       this.cellValue =  new Date(this.getValueToDisplay(params));
       console.log(this.cellValue);
   }
   
   // gets called whenever the user gets the cell to refresh
  refresh(params: ICellRendererParams) {
    // set value into cell again
    this.cellValue = new Date(this.getValueToDisplay(params));
    return true;
  }

   getValueToDisplay(params: ICellRendererParams) {
    console.log("params",params);
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}