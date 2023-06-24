import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { customerTableUrl, convertDataFromRequestToTable, next, previous, updatePageVisit, changeTableSize, CustomerAttendanceTable, customerTodayTableUrl } from 'global/utils/tableColumns';

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

}
