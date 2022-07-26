import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-outstanding-details',
  templateUrl: './view-outstanding-details.component.html',
  styleUrls: ['./view-outstanding-details.component.scss']
})
export class ViewOutstandingDetailsComponent implements OnInit {
  amount = 1200;
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
  constructor() { }

  ngOnInit(): void {
  }

}
