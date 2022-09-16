import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { CommonDialogComponent } from "../dialogComponent/common/commonDialog.component";
import { SchemeWrapperComponent } from "../webComponents/scheme-wrapper/scheme-wrapper.component";

@Component({
    selector: 'btn-cell-renderer',
    template: `
      <button mat-raised-button (click)="btnClickedHandler()">Scheme</button>
    `,
  })

  export class BtnCellRenderer implements ICellRendererAngularComp {

    constructor(private dialog:MatDialog){
      
    }
    
    refresh(params: ICellRendererParams): boolean {
        throw new Error("Method not implemented.");
    }
    private params: any;
  
    agInit(params: any): void {
      this.params = params;
    }
  
    btnClickedHandler() {
      //this.params.clicked(this.params.value);
      console.log(this.params);
      this.dialog.open(CommonDialogComponent,{
        width:'1000px', 
        data:this.params.data,
        panelClass: 'custom-dialog-container'
      });

    }
  }