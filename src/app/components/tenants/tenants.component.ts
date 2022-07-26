import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { DateUtilService } from 'src/app/commonFunctions/dateUtil.service';
import { ImageService } from 'src/app/commonFunctions/image.service';
import { FormValidation } from 'src/app/services/formValidation.service';
import { Tenant } from '../../classes/tenant.class';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss']
})
export class TenantsComponent extends FormValidation {

  constructor(private commonService:CommonService,private dateUtilService:DateUtilService,private imageService:ImageService) {
    super();
    }

  // form Validation Fields
  tenantForm = new FormGroup({
    roomNo : new FormControl('',[Validators.required, Validators.maxLength(3), Validators.pattern(this.numberRegex)]),
    name : new FormControl('',[Validators.required, Validators.maxLength(30)]),
    address : new FormControl('',[Validators.required]),
    uin : new FormControl('',[Validators.required, Validators.maxLength(12), Validators.pattern(this.numberRegex)]),
    depositAmount : new FormControl('',[Validators.required, Validators.pattern(this.numberRegex)]),
    rentStartDate : new FormControl('',[Validators.required]),
    file : new FormControl('',[Validators.required]),
    isActive : new FormControl('',[Validators.required])
  });
  
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

  // Object Declaration of Class
  tenantModel!: Tenant;
  selectedImage?:File
  fd = new FormData();
  
  ngOnInit(): void {
    this.tenantModel = new Tenant();
  }
  
  // Insert Tenant Data
  onSave(){
    if(this.tenantForm.valid){
      // convert date into milliSecond
     // this.tenantModel.rentStartDate = this.dateUtilService.dateInMillisecond(this.tenantForm.controls['rentStartDate'].value);
      console.log(this.tenantModel);
      
      const payload = {
        roomNo : this.tenantForm.controls['roomNo'].value,
        name :   this.tenantForm.controls['name'].value,
        address : this.tenantForm.controls['address'].value,
        uin : this.tenantForm.controls['uin'].value,
        depositAmount : this.tenantForm.controls['depositAmount'].value,
        rentStartDate : this.dateUtilService.dateInMillisecond(this.tenantForm.controls['rentStartDate'].value),
        profilePic : this.selectedImage,
        isActive : this.tenantForm.controls['isActive'].value
      }

      // save tenant
      this.commonService.postData('api/tenants/addTenant/62b15c7f15327f43f5a14621',payload)?.subscribe(data=>{
        console.log("postdatar",data)
      },)
    }
  }

  insertProfilePic(event:any){
    this.selectedImage = <File>event.target.files[0];
    //this.tenantForm.patchValue({profilePic : this.selectedImage});
    //this.selectedImage =  this.imageService.insertImage(event)
      //this.tenantModel.profilePic = event.target.files[0].name;
  }
}
