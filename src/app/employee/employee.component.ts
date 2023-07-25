import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { formatToDateWord } from 'global/date';
import { next, previous, updatePageVisit, changeTableSize, convertDataFromRequestToTable, EmployeeTable, employeeTableUrl } from 'global/utils/tableColumns';
import { Employee } from './Employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  table = EmployeeTable
  isLoading = false;

  constructor(private http: HttpClient) {
    this.getData(this.table.search, this.table.currentPage, this.table.size);
  }

  getData(search: string, page: number, size: number) {
    this.isLoading = true;
    const req = this.http.get<any>(employeeTableUrl(search, page, size));
    req.subscribe((data: any) => {
      convertDataFromRequestToTable(data, this.table);
      this.table.content.forEach((content) => {
        content.user.birthDate = formatToDateWord(content.user.birthDate);
      });
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
    this.getData(this.table.search, page, this.table.size);
    this.table.currentPage = page;
    updatePageVisit(this.table);
  }

  changeTableSize(size: number) {
    changeTableSize(this.table, size);
    this.getData(this.table.search, 1, this.table.size);
  }

  
  _handleSearchClick () {
    this.getData(this.table.search,1,this.table.size);    
  }
}
