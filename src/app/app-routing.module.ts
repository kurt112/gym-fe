import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent as CustomerAdd } from './customer/add/add.component';

const routes: Routes = [
  {path: 'customer/add' , component: CustomerAdd},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
