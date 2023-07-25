import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { customerTableUrl, convertDataFromRequestToTable, next, previous, updatePageVisit, changeTableSize, CustomerAttendanceTable, customerTodayTableUrl } from 'global/utils/tableColumns';
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
    const { value: formValues } = await Swal.fire({
      title: 'Guest Details',
      html:
        '<p class="text-black">Firsname</p> <input id="firstName" class="firstName form-control">' + '<br>' +
        '<p class="text-black">Lastname</p> <input id="lastName" class="lastName form-control">',
      focusConfirm: false,
      preConfirm: () => {

        let firstName = (<HTMLInputElement>document.getElementById('firstName')).value;
        const lastName =(<HTMLInputElement>document.getElementById('lastName')).value;

        return [
          firstName,
          lastName  
        ]
      }
    })

    if (formValues) {
      Swal.fire(JSON.stringify(formValues))
    }
  }

  popUpForInputDataOfGuest() {

  }

  popUpForSearchMember() {

  }







}
