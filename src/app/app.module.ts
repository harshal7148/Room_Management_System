import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TenantsComponent } from './components/tenants/tenants.component';
import { OutstandingDetailsComponent } from './components/outstanding-details/outstanding-details.component';

@NgModule({
  declarations: [
    AppComponent,
    TenantsComponent,
    OutstandingDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
