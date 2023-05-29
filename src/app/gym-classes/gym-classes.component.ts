import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EmployeeTable, changeTableSize, convertDataFromRequestToTable, employeeTableUrl, next, previous, updatePageVisit } from 'global/utils/tableColumns';

@Component({
  selector: 'app-gym-classes',
  templateUrl: './gym-classes.component.html',
  styleUrls: ['./gym-classes.component.scss']
})
export class GymClassesComponent {

  isEnrollMemberOpen = false;

  table = EmployeeTable;
  isLoading = false;

  leftChecked: string[] = [];
  rightChecked: string[] = [];

  leftList = ['h', 'i', 'j', 'k', 'l', 'm', 'n'];
  rightList = ['a', 'b', 'c', 'd', 'e', 'f', 'g']

  constructor(private http: HttpClient) {
    this.getData('', this.table.currentPage, this.table.size);
  }

  getData(search: string, page: number, size: number) {
    this.isLoading = true;
    const req = this.http.get<any>(employeeTableUrl(search, page, size));
    req.subscribe((data) => {
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

  changeEnrollMember(value: boolean) {
    this.isEnrollMemberOpen = value;
  }

  transferToRight() {
    this.leftChecked.forEach(data => {
      this.rightList.unshift(data);
      this.leftList = this.leftList.filter(fData => fData !== data)
    });

    this.leftChecked = [];
  }

  transferToLeft() {
    this.rightChecked.forEach(data => {
      this.leftList.unshift(data);
      this.rightList = this.rightList.filter(fData => fData !== data)
    });

    this.rightChecked = [];
  }

  checked(value: string, isLeft: boolean) {
    if (isLeft) {
      this.leftChecked.push(value);
      return;
    }

    this.rightChecked.push(value);
  }

}
