import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { udpateAttendanceByFirstNameLastNameandMiddleName } from 'global/utils/endpoint';
import { firstNameLastNameAndMiddleNamePopUpForm } from 'global/utils/pop-up-form';
import { convertDataFromRequestToTable, next, previous, updatePageVisit, changeTableSize, CustomerAttendanceTable, customerTodayTableUrl } from 'global/utils/tableColumns';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent {

  table = CustomerAttendanceTable
  isLoading = false;
  isInOutVisible = true;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getData('', this.table.currentPage, this.table.size);
  }

  getData(search: string, page: number, size: number) {
    this.isLoading = true;
    this.http.get<any>(customerTodayTableUrl(search, page, size)).subscribe((data) => {
      console.log(data);

      convertDataFromRequestToTable(data, this.table)
      this.isLoading = false;
    });
  }

  next() {
    next(this.table);
  }

  previous() {
    previous(this.table);
  }

  visitTable(page: number) {
    if (page === this.table.currentPage) return;
    this.getData('', page, this.table.size);
    this.table.currentPage = page;
    updatePageVisit(this.table);
  }

  changeTableSize(size: number) {
    changeTableSize(this.table, size);
    this.getData('', 1, this.table.size);
  }

  async popUpForIsGuestIsInvitedByMember() {

    const {value} = await firstNameLastNameAndMiddleNamePopUpForm()
    
    if (value) {
      
      const firstName = value[0];
      const lastName = value[1];
      const middleName = value[2];
      
      this.http.get<any>(udpateAttendanceByFirstNameLastNameandMiddleName(firstName, lastName, middleName)).subscribe((data) => {
        convertDataFromRequestToTable(data, this.table)
        this.isLoading = false;
        this.ngOnInit();
        Swal.fire({
          title: "Manual Attendance",
          text: "Attendance is Success",
          icon: "success",
          timer: 500,
        });
      }, (error) => {
        
        Swal.fire({
          title: "Manual Attendance",
          text: error.error.message,
          icon: "error",
          timer: 2000,
        });
      });
    }
  }

  popUpForInputDataOfGuest() {

  }

  popUpForSearchMember() {

  }







}
