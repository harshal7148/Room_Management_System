import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-view-outstanding-details',
  templateUrl: './view-outstanding-details.component.html',
  styleUrls: ['./view-outstanding-details.component.scss'],
  providers: [DatePipe]
})
export class ViewOutstandingDetailsComponent implements OnInit, AfterViewInit {
  amount: number = 0;
  outstandingData: any;
  tenantId: any;
  columnDefs!: any[];
  baseUrl = "http://localhost:4000/";

  rowData!: any[];
  constructor(private httpService: HttpServiceService, private route: ActivatedRoute, private datePipe: DatePipe) {
    console.log('ini')
  }

  ngAfterViewInit(): void {
    console.log('sdfsd', this.outstandingData);

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(res => {
      this.tenantId = res;
    });

    this.createColumnDefs();

    this.getoutstandingDetails();
  }

  createColumnDefs() {
    this.columnDefs = [
      { headerName: "FromDate", field: "FromDate", sortable: true, filter: true },
      { headerName: "ToDate", field: "ToDate", sortable: true, filter: true },
      { headerName: "OutstandingAmount", field: "OutstandingAmount", sortable: true, filter: true },
      { headerName: "Paid", field: "Paid", sortable: true, filter: true },
    ];
  }

  getoutstandingDetails() {
    let total: number = 0;
    let filterRes;
    this.httpService.getOutstandingDetails().subscribe((result: any) => {
      filterRes = result.filter((item: any) => {
        return item._id == this.tenantId.Id;
      });
      this.outstandingData = filterRes[0];
      this.createRowData();
      this.outstandingData?.histories?.forEach((element: any) => {
        total += +element.paidAmount;
      });
      this.amount = total;
    });
  }

  createRowData() {
    let arr: any = [];
    this.outstandingData.histories.forEach((element: any) => {
      arr.push({ FromDate: this.datePipe.transform(element.fromDate, 'dd/MM/yyyy'), ToDate: this.datePipe.transform(element.toDate, 'dd/MM/yyyy'), OutstandingAmount: element.paidAmount, Paid: element.isPaid });
    });
    this.rowData = arr;
  }

}
