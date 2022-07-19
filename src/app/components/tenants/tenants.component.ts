import { Component, OnInit } from '@angular/core';
import { Tenant } from '../../classes/tenant.class';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss']
})
export class TenantsComponent implements OnInit {

  constructor(private commonService:CommonService) { }

  // Object Declaration of Class
  tenantModel!: Tenant;

  //
  columnDefs = [
    { headerName: "FromDate", field: "FromDate", sortable: true, filter: true},
    { headerName: "ToDate", field: "ToDate", sortable: true, filter: true},
    { headerName: "OutstandingAmount", field: "OutstandingAmount", sortable: true, filter: true},
    { headerName: "Paid", field: "Paid", sortable: true, filter: true},
  ];

  rowData = [
    { FromDate: '12/04/2022', ToDate: '12/04/2033', OutstandingAmount: "00", Paid: 'Yes'},
    { FromDate: '12/04/2022', ToDate: '12/04/2033', OutstandingAmount: "1200", Paid: 'No'},
    { FromDate: '12/04/2022', ToDate: '12/04/2033', OutstandingAmount: "1200", Paid: 'No'},
    { FromDate: '12/04/2022', ToDate: '12/04/2033', OutstandingAmount: "00", Paid: 'Yes'},
  ];
  

  ngOnInit(): void {
    this.tenantModel = new Tenant();
  }
  
  // Insert Tenant Data
  onSave(){
    console.warn(this.tenantModel);
    this.commonService.postData('api/tenants/addTenant/62b15c7f15327f43f5a14621',this.tenantModel)?.subscribe(data=>{
      console.log("postdatar",data)
    },)
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        //this.srcResult = e.target.result;
      };
  
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

}
