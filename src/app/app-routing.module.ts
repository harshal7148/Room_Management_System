import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/common/login/login.component';
import { TenantsComponent } from './components/tenants/tenants.component';
import { OutstandingListComponent } from './components/outstanding-list/outstanding-list.component';
import { ViewOutstandingDetailsComponent } from './components/view-outstanding-details/view-outstanding-details.component';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'tenants', component: TenantsComponent },
  { 
    path: 'outstandings',
    component: OutstandingListComponent,
    // children: [
      
    // ]
  },
  {
    path: 'outstandings/details',
    component: ViewOutstandingDetailsComponent
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
