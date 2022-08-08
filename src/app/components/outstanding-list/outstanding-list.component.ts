import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CellClickedEvent, GetRowIdFunc, GetRowIdParams, GridReadyEvent } from 'ag-grid-community';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-outstanding-list',
  templateUrl: './outstanding-list.component.html',
  styleUrls: ['./outstanding-list.component.scss']
})
export class OutstandingListComponent implements OnInit {
  columnDefs = [
    { headerName: "Name", field: "Name", sortable: true, filter: true },
    { headerName: "Age", field: "Age", sortable: true, filter: true },
    { headerName: "City", field: "City", sortable: true, filter: true },
    { headerName: "Price", field: "Price", sortable: true, filter: true },
  ];

  rowData = [
    { Name: 'yuy', Age: '12', City: "Pune", Price: '88' },
    { Name: 'hhh', Age: '77', City: "Pune", Price: '83' },
    { Name: 'waq', Age: '44', City: "Pune", Price: '23' },
    { Name: 'bnv', Age: '99', City: "Pune", Price: '09' },
  ];
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => params.data.Price;

  onGridReady(params: GridReadyEvent) {
    console.log(params)
  }

  constructor(private httpService: AuthService,
    private router: Router, private route: ActivatedRoute, private commonService: CommonService) { }

  onCellClicked(event: CellClickedEvent) {
    console.log('Cell was clicked', this.route);
    this.router.navigate(['outstandings/details']);
  }

  ngOnInit(): void {
    this.commonService.getData('api/outstanding')?.subscribe(data => {
      if (data) {
        // alert(data.message);
      }
    })
    // console.log(this.getRowId)
    //this.httpService.getOutstandingDetails().subscribe(res => {});
  }

}
