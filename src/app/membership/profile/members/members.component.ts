import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MembershipWithUserTable, changeTableSize, convertDataFromRequestToTable, membershipMembersTableUrl, next, previous, updatePageVisit } from 'global/utils/tableColumns';
import {Location} from '@angular/common';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent {

  id: string | null = '';
  table = MembershipWithUserTable
  isLoading = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getMembershipMembersTableUrl(this.id, '', this.table.currentPage, this.table.size);
  }

  getMembershipMembersTableUrl(id: string | null, search: string, page: number, size: number) {
    this.isLoading = true;
    this.http.get<any>(membershipMembersTableUrl(id, search, page, size)).subscribe((data) => {
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
    // this.getData('', page, this.table.size);
    this.table.currentPage = page;
    updatePageVisit(this.table);
  }

  changeTableSize(size: number) {
    changeTableSize(this.table, size);
    // this.getData('', 1, this.table.size);
  }

  goBack() {
    this.location.back();
  }

}
