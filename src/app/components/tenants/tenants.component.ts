import { Component, OnInit } from '@angular/core';
import { Tenant } from '../../classes/tenant.class';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss']
})
export class TenantsComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  // Object Declaration of Class
  tenantModel!: Tenant;

  ngOnInit(): void {
    this.tenantModel = new Tenant();
  }

  // Insert Tenant Data
  onSave() {
    const ownerId = localStorage.getItem('ownerId');
    this.commonService.postData(`api/tenants/addTenant/${ownerId}`, this.tenantModel)?.subscribe(data => {
      console.log("postdatar", data)
    })
  }

}
