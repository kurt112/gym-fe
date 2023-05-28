import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CustomerTable, changeTableSize, convertDataFromRequestToTable, customerTableUrl, next, previous, updatePageVisit} from 'global/utils/tableColumns';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  
  table = CustomerTable
  isLoading = false;

  constructor(private http:HttpClient){
    this.getData ('', this.table.currentPage, this.table.size);
  }

  getData (search: string, page: number, size: number) {
    this.isLoading = true;
    const req = this.http.get<any>(customerTableUrl(search,page,size));
    req.subscribe((data) => {
      convertDataFromRequestToTable(data,this.table) 
      this.isLoading = false;
    });
  }

  next () {
    next(this.table);
  }

  previous () {
    previous(this.table);
  }

  visitTable (page: number) {
    if(page === this.table.currentPage) return;
    this.getData('', page,this.table.size);
    this.table.currentPage = page;
    updatePageVisit(this.table);
  }

  changeTableSize (size: number) {
    changeTableSize(this.table, size);
    this.getData('', 1,this.table.size);
  }

}
