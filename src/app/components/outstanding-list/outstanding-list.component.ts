import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CellClickedEvent, GetRowIdFunc, GetRowIdParams, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { ViewOutstandingDetailsComponent } from '../view-outstanding-details/view-outstanding-details.component';

@Component({
  selector: 'app-outstanding-list',
  templateUrl: './outstanding-list.component.html',
  styleUrls: ['./outstanding-list.component.scss']
})
export class OutstandingListComponent implements OnInit {
  outstandingListData: any;
  private gridOptions: GridOptions;
  columnDefs!: any[];

  @ViewChild(ViewOutstandingDetailsComponent) ViewOutstandingDetailsComponent!: ViewOutstandingDetailsComponent;

  rowData: any = [];
  totalOutstandingAmount = 0;
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => params.data.Active;

  onGridReady(params: GridReadyEvent) {
    console.log(params)
  }

  constructor(private httpService: HttpServiceService,
    private router: Router, private route: ActivatedRoute) {
    this.gridOptions = <GridOptions>{};
    this.createColumnDefs();
    this.createRowData();
  }

  createColumnDefs() {
    this.columnDefs = [
      { headerName: "ID", field: "ID", sortable: true, filter: true },
      { headerName: "Name", field: "Name", sortable: true, filter: true },
      { headerName: "Room Number", field: "Room_Number", sortable: true, filter: true },
      { headerName: "Aomount", field: "Amount", sortable: true, filter: true },
      { headerName: "Active", field: "Active", sortable: true, filter: true },
      { headerName: "Settle", field: "Settle", sortable: true, filter: true, checkboxSelection: true },
    ];
  }

  createRowData() {
    let arr: any = [];
    let outstandingAmount: number = 0;
    this.httpService.getOutstandingDetails().subscribe(res => {
      this.outstandingListData = res;
      this.outstandingListData.forEach((element: any) => {
        // outstandingAmount += +element.depositAmount;
        arr.push({ ID: element._id, Name: element.tenantId?.name, Room_Number: element.tenantId?.roomNo, Amount: element.tenantId?.depositAmount, Active: element.tenantId?.isActive, Settle: '' })
      });
      this.totalOutstandingAmount = outstandingAmount;
      this.rowData = arr;
    });
  }

  onCellClicked(event: CellClickedEvent) {
    // console.log(this.outstandingListData)
    // this.ViewOutstandingDetailsComponent.outstandingData = [];
    // console.log(this.ViewOutstandingDetailsComponent.outstandingData)
    this.router.navigate(['outstandings/details'], {
      queryParams: {
        Id: event.data.ID
      }
    });
  }

  ngOnInit(): void {

  }


}
