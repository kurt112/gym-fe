import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { formatToDateWord } from 'global/date';
import { membershipTableUrl, convertDataFromRequestToTable, next, previous, updatePageVisit, changeTableSize, AuditTable, auditTrailTableUrl } from 'global/utils/tableColumns';
import { Membership } from 'src/app/membership/Membership';
import { Audit } from './Audit';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent {
  table = AuditTable
  isLoading = false;

  constructor(private http: HttpClient) {
    this.getData('', this.table.currentPage, this.table.size);
  }

  getData(search: string, page: number, size: number) {
    this.isLoading = true;
    this.http.get<Audit>(auditTrailTableUrl(search, page, size)).subscribe((data) => {
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
  
    this.getData(this.table.search, 1, this.table.size);
  }
}
