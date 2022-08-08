import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { BaseComponent } from "src/app/base.component";

@Component({
    selector: 'image-cell-component',
    template: `
        <img src={{cellValue}} style="height:24px">
    `,
})
export class ImageCellRender  extends BaseComponent implements ICellRendererAngularComp {

    public cellValue!: string;

   // gets called once before the renderer is used
   agInit(params: ICellRendererParams): void {
       this.cellValue = this.backendUrl + this.getValueToDisplay(params);
       console.log(this.cellValue);
   }
   
   // gets called whenever the user gets the cell to refresh
  refresh(params: ICellRendererParams) {
    // set value into cell again
    this.cellValue = this.backendUrl + this.getValueToDisplay(params);
    return true;
  }

   getValueToDisplay(params: ICellRendererParams) {
    console.log("params",params);
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}