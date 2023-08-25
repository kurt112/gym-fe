import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { next, previous, updatePageVisit, changeTableSize, AuditTable, auditTrailTableUrl, convertDataFromRequestToTable } from 'global/utils/tableColumns';
import { formatDate } from '@angular/common';
import { Audit } from './Audit';
@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent {
  table = AuditTable
  isLoading = false;

  startDate: string | null = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  endDate: string | null = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  constructor(private http: HttpClient) {
    this.getData('', this.table.currentPage, this.table.size);
  }
  getData(search: string, page: number, size: number) {
    this.isLoading = true;
    this.http.get<Audit>(auditTrailTableUrl(search, page, size, this.startDate, this.endDate)).subscribe((data) => {
      console.log(data);

      convertDataFromRequestToTable(data, this.table)
      this.isLoading = false;
    }, () => {

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

  _handleSearchClick() {

    this.getData('', this.table.currentPage, this.table.size);
  }
}
