import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbPaginationModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { ScheduleComponent as StoreSchedule } from './store/schedule/schedule.component';
import { MembershipComponent } from './membership/membership.component';
import { TransferListComponent } from './utility/input/transfer-list/transfer-list.component';
import { AttendanceComponent as CustomerAttendance } from './utility/attendance/attendance.component';
import { ProfileComponent as GymClassProfile } from './gym-classes/profile/profile.component';
import { ScheduleComponent } from './utility/schedule/schedule.component';
import { LoadingComponent as FormLoading } from './utility/form/loading/loading.component';
import { ProfileComponent as MembershipProfile } from './membership/profile/profile.component';
import { MembersComponent as MembershipMembers } from './membership/profile/members/members.component';
import { CardTapComponent } from './utility/card-tap/enrollment/card-tap-enrollment.component';
import { InputDirective } from './_directives/input.directive';
import { MembersComponent as GymClassMembers } from './gym-classes/profile/members/members.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardTapTopupComponent } from './utility/card-tap/topUp/card-tap-topup.component';
import { TopUpComponent as CustomerTopUp } from './customer/top-up/top-up.component';
import { AuditComponent } from './store/audit/audit.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScheduleComponent as GymClassesSheduleComponent } from './gym-classes/profile/schedule/schedule.component';
import { AutocompleteComponent } from './utility/input/autocomplete/autocomplete.component';
import { TableSearchComponent } from './utility/input/modal/table-search/table-search.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { GymClassesTypesComponent } from './configuration/gym-classes-types/gym-classes-types.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './landing/login/login.component';
import { RegisterComponent } from './landing/register/register.component';
import { LoginRouteService } from './services/routes/login-route.service';

const routes: Routes = [
  { path: 'customers', component: CustomerComponent },
  { path: 'customers/:id', component: CustomerProfile },
  { path: 'customers/transaction/top-up', component: CustomerTopUp },
  { path: 'employees', component: EmployeeComponent },
  { path: 'employees/:id', component: EmployeeProfile },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'attendance/customers', component: CustomerAttendance },
  { path: 'classes', component: GymClassesComponent },
  { path: 'classes/:id', component: GymClassProfile },
  { path: 'classes/:id/schedules', component: GymClassesSheduleComponent },
  { path: 'classes/:id/members', component: GymClassMembers },
  { path: 'membersips', component: MembershipComponent },
  { path: 'membersips/:id', component: MembershipProfile },
  { path: 'membersips/:id/members', component: MembershipMembers },
  { path: 'dashboard', pathMatch: 'full', component: DashboardComponent },
  { path: 'schedules', pathMatch: 'full', component: StoreComponent },
  { path: 'audit', pathMatch: 'full', component: AuditComponent },
  { path: 'configuration', pathMatch: 'full', component: ConfigurationComponent },
  { path: 'configuration/gym-classes-types', pathMatch: 'full', component: GymClassesTypesComponent },
  { path: 'login', pathMatch: 'full', component: LoginComponent, canActivate: [LoginRouteService] },
  { path: '', pathMatch: 'full', component: LandingComponent },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
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
    GymClassMembers,
    DashboardComponent,
    CardTapTopupComponent,
    CustomerTopUp,
    AuditComponent,
    StoreSchedule,
    GymClassesSheduleComponent,
    AutocompleteComponent,
    TableSearchComponent,
    ConfigurationComponent,
    GymClassesTypesComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    FormsModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    NgbPaginationModule,
    NgbAlertModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, LoginRouteService],
  bootstrap: [AppComponent],
  exports: [RouterModule]

})
export class AppModule { }
