import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/common/login/login.component';
import { OutstandingDetailsComponent } from './components/outstanding-details/outstanding-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'outstandings', component: OutstandingDetailsComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
