import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, MaxLengthValidator, NgForm, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi, ColDef, ValueFormatterParams, GetRowIdFunc, GetRowIdParams } from 'ag-grid-community';
import { map, Observable, startWith } from 'rxjs';
import { DateUtilService } from 'src/app/commonFunctions/dateUtil.service';
import { FormValidation } from 'src/app/services/formValidation.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
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

  constructor(private commonService:CommonService,private dateUtilService:DateUtilService, public currencyPipe:CurrencyPipe,private snackBarService:SnackBarService) {
    super();
  }

  /* form Validation Fields start */
  @ViewChild('myForm') myForm!: NgForm;
  tenantForm = new FormGroup({
    roomNo : new FormControl('',[Validators.required]),
    name : new FormControl('',[Validators.required, Validators.maxLength(30)]),
    address : new FormControl('',[Validators.required]),
    uin : new FormControl('',[Validators.required, Validators.maxLength(12), Validators.pattern(this.numberRegex)]),
    depositAmount : new FormControl('',[Validators.required, Validators.pattern(this.numberRegex)]),
    rentStartDate : new FormControl('',[Validators.required]),
    profilePic : new FormControl(),
    isActive : new FormControl()
  });
  /* form Validation Fields end */

  /* ag Grid */
  private gridApi: GridApi = new GridApi;
  columnApi:any;
  //@ViewChild('agGrid')
  agGrid!: AgGridAngular;
  public rowSelection: 'single' | 'multiple' = 'single';

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

  // Object Declaration of Class
  tenantModel!: Tenant;
  selectedImage!: File
  fd = new FormData();
  tenantId!:string;
  profilePic:any;
  isFileSelected:boolean = false;
  availableRoomNos : any[] = [];
  myControl = new FormControl('');
  filteredOptions!: any;
   
  
  ngOnInit(): void {
    this.tenantModel = new Tenant();
    this.getAvailableRoomNos();
    // this._snackBar.triggerSnackBar('successfull');
  }

  onGridReady(params:any){
    this.gridApi = params.api;
    console.log(this.gridApi);
    this.columnApi = params.columnApi; 
    // binding a grid with tenant data
    this.getTenantList();
  }

  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    return params.data._id;
  };

  
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

  onSelectionChanged(event:any) {
    this.Mode = 'edit';
    const tenantModel:any = this.gridApi.getSelectedRows();
    this.tenantId = tenantModel[0]._id;
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
  }

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
            this.snackBarService.triggerSnackBar(addRes.message);
            this.gridApi.applyTransaction({add : [addRes.data]})
            this.refreshForm();
          },)
        }
        else{
          // update tenant
          this.fd.append('isActive',  this.tenantForm.controls['isActive'].value);
          this.commonService.putData('api/tenants/updateTenant/' + this.tenantId + '/62b15c7f15327f43f5a14621', this.fd)?.subscribe(updateRes=>{
            this.snackBarService.triggerSnackBar(updateRes.message);
            var rowNode = this.gridApi.getRowNode(this.tenantId)!;
            rowNode?.setData(updateRes.data);
            this.refreshForm();
          },)
        }
    }
  }

  // get Image Data
  getImageData(event: any) {
    this.selectedImage = <File>event.target.files[0];
    this.isFileSelected = true;
  }

  getProfilePic(){
    return this.backendUrl + this.tenantForm.controls['profilePic'].value;
  }
  refreshForm(){
    this.tenantForm.reset();
    this.myForm.resetForm();
    this.Mode = "add";
    this.tenantId = "";
    this.isFileSelected = false;
    
  }
  
  /* room No filteration Logic start */
  async getAvailableRoomNos(){
    this.commonService.getData('/api/tenants/roomNoDropDown/62b15c7f15327f43f5a14621')?.subscribe(
      data => {
        this.availableRoomNos = data;
        console.log("availableRoomNos",this.availableRoomNos)
        this.searchRoomNo();
    })
  }

  searchRoomNo(){
    this.filteredOptions = this.myControl.valueChanges.pipe(  
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string) {
    console.log("availableRoomNos",this.availableRoomNos)
    const filterValue = value.toLowerCase();
     return this.availableRoomNos.filter((roomNo:any) => roomNo.toLowerCase().includes(filterValue));
  }
   /* room No filteration Logic end */
  
}
