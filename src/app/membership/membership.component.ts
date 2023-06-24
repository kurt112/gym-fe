import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { formatToDateWord } from 'global/date';
import { convertDataFromRequestToTable, next, previous, updatePageVisit, changeTableSize, MembershipTable, membershipTableUrl } from 'global/utils/tableColumns';
import { Membership } from './Membership';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss']
})
export class MembershipComponent {
  table = MembershipTable
  isLoading = false;

  constructor(private http: HttpClient) {
    this.getData('', this.table.currentPage, this.table.size);
  }

  getData(search: string, page: number, size: number) {
    this.isLoading = true;
    const req = this.http.get<any>(membershipTableUrl(search, page, size));
    req.subscribe((data) => {
      console.log(data);
      
      data.content = data.content.map((value: Membership) => {
        value.createdAt = value.createdAt ? formatToDateWord(value.createdAt) : 'NA';
        value.membershipPromoExpiration = value.membershipPromoExpiration ? formatToDateWord(value.membershipPromoExpiration) : 'NA';
        return value;
      })
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
