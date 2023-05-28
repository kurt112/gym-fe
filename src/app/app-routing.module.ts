import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent as CustomerAdd } from './customer/add/add.component';
import { ProfileComponent as EmployeeComponent } from './employee/profile/profile.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
