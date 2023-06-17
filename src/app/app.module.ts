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
import { ProfileComponent as CustomerProfile } from './customer/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent as EmployeeProfile } from './employee/profile/profile.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { StoreComponent } from './store/store.component';
import { MembershipComponent } from './membership/membership.component';
import { TransferListComponent } from './utility/input/transfer-list/transfer-list.component';
import { AttendanceComponent as CustomerAttendance } from './utility/attendance/attendance.component';
import { ProfileComponent as GymClassProfile } from './gym-classes/profile/profile.component';
import { ScheduleComponent } from './utility/schedule/schedule.component';
import { LoadingComponent as FormLoading } from './utility/form/loading/loading.component';
import { ProfileComponent as MembershipProfile } from './membership/profile/profile.component';
import { MembersComponent as MembershipMembers } from './membership/profile/members/members.component';
import { CardTapComponent } from './utility/card-tap/card-tap.component';
import { InputDirective } from './_directives/input.directive';
import { MembersComponent as GymClassMembers} from './gym-classes/profile/members/members.component';

const routes: Routes = [
  { path: 'customers', component: CustomerComponent },
  { path: 'customers/:id', component: CustomerProfile },
  { path: 'employees', component: EmployeeComponent },
  { path: 'employees/:id', component: EmployeeProfile },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'attendance/customers', component: CustomerAttendance },
  { path: 'classes', component: GymClassesComponent },
  { path: 'classes/:id', component: GymClassProfile },
  { path: 'classes/:id/members', component: GymClassMembers },
  { path: 'membersips', component: MembershipComponent },
  { path: 'membersips/:id', component: MembershipProfile },
  { path: 'membersips/:id/members', component: MembershipMembers }
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
    EmployeeProfile,
    AttendanceComponent,
    StoreComponent,
    MembershipComponent,
    TransferListComponent,
    GymClassProfile,
    ScheduleComponent,
    FormLoading,
    CustomerAttendance,
    MembershipProfile,
    MembershipMembers,
    CardTapComponent,
    InputDirective,
    GymClassMembers
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
