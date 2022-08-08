import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi, ColDef, ValueFormatterParams, ICellRendererParams, GetRowIdFunc, GetRowIdParams } from 'ag-grid-community';
import { DateUtilService } from 'src/app/commonFunctions/dateUtil.service';
import { ImageService } from 'src/app/commonFunctions/image.service';
import { FormValidation } from 'src/app/services/formValidation.service';
import { Tenant } from '../../classes/tenant.class';
import { CommonService } from '../../services/common.service';
import { DateCellRender } from './date-cell-render.component';
import { ImageCellRender } from './image-cell-render.component';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss'],
  providers: [CurrencyPipe],

})
export class TenantsComponent extends FormValidation {

  //
  //
  private gridApi: GridApi = new GridApi;
  columnApi:any;

  columnDefs : ColDef[] = [
    { headerName: "Profile Pic", field: "profilePic", cellRenderer:ImageCellRender, sortable: true, filter: true},
    { headerName: "Room No", field: "roomNo", sortable: true, filter: true},
    { headerName: "Name", field: "name", sortable: true, filter: true},
    { headerName: "Address", field: "address", sortable: true, filter: true},
    { headerName: "Adhar No", field: "uin", sortable: true, filter: true},
    { headerName: "Deposit Amount", field: "depositAmount", sortable: true, filter: true},
    { headerName: "Rent Start Date", field: "rentStartDate", cellRenderer:DateCellRender, sortable: true, filter: true},
  ];

  rowData = [
  ];

  constructor(private commonService:CommonService,private dateUtilService:DateUtilService, private currencyPipe:CurrencyPipe
    ) {
    super();
    }

  // form Validation Fields
  tenantForm = new FormGroup({
    roomNo : new FormControl('',[Validators.required, Validators.maxLength(3),Validators.pattern(this.numberRegex)]),
    name : new FormControl('',[Validators.required, Validators.maxLength(30)]),
    address : new FormControl('',[Validators.required]),
    uin : new FormControl('',[Validators.required, Validators.maxLength(12), Validators.pattern(this.numberRegex)]),
    depositAmount : new FormControl('',[Validators.required, Validators.pattern(this.numberRegex)]),
    rentStartDate : new FormControl('',[Validators.required]),
    profilePic : new FormControl(),
    isActive : new FormControl()
  });
  

  // Object Declaration of Class
  tenantModel!: Tenant;
  selectedImage!:File
  fd = new FormData();
  tenantId!:string;
  profilePic:any;
  isFileSelected:boolean = false;
   
  
  ngOnInit(): void {
    this.tenantModel = new Tenant();
  }
  

  onGridReady(params:any){
    this.gridApi = params.api;
    console.log(this.gridApi);
    this.columnApi = params.columnApi; 
    // binding a grid with tenant data
    this.getTenantList();
  }

  getTenantList(){
    this.commonService.getData('/api/tenants/getTenant/62b15c7f15327f43f5a14621')?.subscribe(
      data=>{
        console.log(data);
        //this.gridApi.setRowData([]);
        var newData = data;
        this.gridApi.applyTransaction({add:newData});
      }
    )
  }

  // get Image Data
  getImageData(event:any){
    this.selectedImage = <File>event.target.files[0];
    this.isFileSelected = true;
    console.log(this.selectedImage);
  }

  @ViewChild('agGrid')
  agGrid!: AgGridAngular;
  public rowSelection: 'single' | 'multiple' = 'single';

  // {{totalOutstandingAmount | currency: 'INR':'symbol':'4.0'}}
  onRowSelected(event:any) {
    console.log("row " + event.node.data.athlete + " selected = " + event.node.selected);
  }

  currency(params:ValueFormatterParams){
    console.log(this.currencyPipe);
    return "hello";
  }

  onSelectionChanged(event:any) {
    this.Mode = 'edit';
    const tenantModel:any = this.gridApi.getSelectedRows();
    this.tenantId = tenantModel[0]._id;

    console.log(tenantModel);
    this.tenantForm.patchValue({
        profilePic: tenantModel[0].profilePic ? tenantModel[0].profilePic : '',
        roomNo : tenantModel[0].roomNo,
        name :   tenantModel[0].name,
        address : tenantModel[0].address,
        uin : tenantModel[0].uin,
        depositAmount :tenantModel[0].depositAmount,
        rentStartDate : new Date(tenantModel[0].rentStartDate),
        isActive : tenantModel[0].isActive
    })

    console.log(document.getElementById('profilePics'));
    //this.selectedImage. = tenantModel[0].profilePic
    console.log(this.tenantForm); 
  }

  getProfilePic(){
    //console.log(this.backendUrl + this.tenantForm.controls['profilePic'].value);
    return this.backendUrl + this.tenantForm.controls['profilePic'].value;
  }

  onCellClicked(event:any){
     console.log(event);
  }

  refreshForm(){
    this.tenantForm.reset();
    this.Mode = "add";
    this.tenantId = "";
    this.isFileSelected = false;
  }

  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    return params.data._id;
  };
  
  // Insert Tenant Data
  onSave(){
    if(this.tenantForm.valid){
      // append data in formData
      this.fd = new FormData();

      if(this.isFileSelected){
        this.fd.append('file', this.selectedImage, this.selectedImage.name);
        this.fd.append('profilePic', this.selectedImage.name);  
      }
      else if(this.Mode === 'edit'){
        this.fd.append('profilePic',this.tenantForm.controls['profilePic'].value);
      }

      this.fd.append('roomNo', this.tenantForm.controls['roomNo'].value);
      this.fd.append('name', this.tenantForm.controls['name'].value);
      this.fd.append('address', this.tenantForm.controls['address'].value);
      this.fd.append('uin', this.tenantForm.controls['uin'].value);
      this.fd.append('depositAmount', this.tenantForm.controls['depositAmount'].value);
      let rentStartDate = this.dateUtilService.dateInMillisecond(this.tenantForm.controls['rentStartDate'].value);
      this.fd.append('rentStartDate', JSON.stringify(rentStartDate));
      // save tenant
        if(this.Mode === 'add'){
          this.fd.append('isActive', 'true');
          this.commonService.postData('api/tenants/addTenant/62b15c7f15327f43f5a14621', this.fd)?.subscribe(addRes=>{
            alert(addRes.message);
            this.gridApi.applyTransaction({add : [addRes.data]})
            this.refreshForm();
          },)
        }
        else{
          // update tenant
          this.fd.append('isActive',  this.tenantForm.controls['isActive'].value);
          this.commonService.putData('api/tenants/updateTenant/' + this.tenantId + '/62b15c7f15327f43f5a14621', this.fd)?.subscribe(updateRes=>{
            alert(updateRes.message);
            var rowNode = this.gridApi.getRowNode(this.tenantId)!;
            rowNode?.setData(updateRes.data);
            this.refreshForm();
          },)
        }
    }
  }

  calculateStyles(){
  }
}
