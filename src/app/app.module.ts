import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { CustomerComponent } from './customer/customer.component';
import { AddComponent as CustomerAdd } from './customer/add/add.component';
import { GymClassesComponent } from './gym-classes/gym-classes.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent as CustomerProfile} from './customer/profile/profile.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'customers', component: CustomerComponent },
  { path: 'customers/:id', component: CustomerProfile },
  { path: 'employees', component: EmployeeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    EmployeeComponent,
    CustomerComponent,
    CustomerAdd,
    GymClassesComponent,
    CustomerProfile,
  ],
  imports: [
    FormsModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    NgbPaginationModule,
    NgbAlertModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]

})
export class AppModule { }
