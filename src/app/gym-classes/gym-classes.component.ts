import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { formatToDateWord } from 'global/date';
import {  GymClassTable, changeTableSize, convertDataFromRequestToTable, gymClassTableUrl, next, previous, updatePageVisit } from 'global/utils/tableColumns';

@Component({
  selector: 'app-gym-classes',
  templateUrl: './gym-classes.component.html',
  styleUrls: ['./gym-classes.component.scss']
})
export class GymClassesComponent {

  isEnrollMemberOpen = false;

  table = GymClassTable;
  isLoading = false;


  constructor(private http: HttpClient) {
    this.getData('', this.table.currentPage, this.table.size);
  }

  getData(search: string, page: number, size: number) {
    this.isLoading = true;
    const req = this.http.get<any>(gymClassTableUrl(search, page, size));
    req.subscribe((data) => {
      convertDataFromRequestToTable(data, this.table);
      this.table.content.forEach((content) => {
        if(!content.dateEnd || !content.dateEnd) return;
        
        content.dateEnd = formatToDateWord(content.dateEnd);
        content.dateStart = formatToDateWord(content.dateStart);
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
}  

