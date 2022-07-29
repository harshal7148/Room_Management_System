import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-view-outstanding-details',
  templateUrl: './view-outstanding-details.component.html',
  styleUrls: ['./view-outstanding-details.component.scss']
})
export class ViewOutstandingDetailsComponent implements OnInit {
  amount: number = 0;
  outstandingData: any;
  tenantId: any;
  columnDefs = [
    { headerName: "FromDate", field: "FromDate", sortable: true, filter: true },
    { headerName: "ToDate", field: "ToDate", sortable: true, filter: true },
    { headerName: "OutstandingAmount", field: "OutstandingAmount", sortable: true, filter: true },
    { headerName: "Paid", field: "Paid", sortable: true, filter: true },
  ];

  rowData = [
    { FromDate: '12/04/2022', ToDate: '12/04/2033', OutstandingAmount: "00", Paid: 'Yes' },
    { FromDate: '12/04/2022', ToDate: '12/04/2033', OutstandingAmount: "1200", Paid: 'No' },
    { FromDate: '12/04/2022', ToDate: '12/04/2033', OutstandingAmount: "1200", Paid: 'No' },
    { FromDate: '12/04/2022', ToDate: '12/04/2033', OutstandingAmount: "00", Paid: 'Yes' },
  ];
  constructor(private httpService: HttpServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let total: number = 0;
    this.route.queryParams.subscribe(res => {
      this.tenantId = res;
      console.log(this.tenantId)
      this.httpService.getOutstandingDetails().subscribe((result: any) => {
        this.outstandingData = result.filter((item: any) => this.tenantId == item.tenantId?._id)
        console.log(this.outstandingData)
      });
      this.outstandingData?.histories?.forEach((element: any) => {
        total += +element.paidAmount;
      });
      this.amount = total;
    });
  }

}
