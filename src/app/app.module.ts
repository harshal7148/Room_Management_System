import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TenantsComponent } from './components/tenants/tenants.component';
import { OutstandingListComponent } from './components/outstanding-list/outstanding-list.component';
import { LoginComponent } from './components/common/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { SidebarComponent } from './components/common/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AgGridModule } from 'ag-grid-angular';
import { ViewOutstandingDetailsComponent } from './components/view-outstanding-details/view-outstanding-details.component';

@NgModule({
  declarations: [
    AppComponent,
    TenantsComponent,
    OutstandingListComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    ViewOutstandingDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
