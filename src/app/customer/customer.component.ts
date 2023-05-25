import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CustomerTable, convertDataFromRequestToTable, customerTableUrl, next, previous} from 'global/utils/tableColumns';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Customer } from './customer';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  table = CustomerTable

  constructor(private http:HttpClient){
    this.getData ('', this.table.currentPage, this.table.size);
  }

  getData (search: string, page: number, size: number) {
    const req = this.http.get<any>(customerTableUrl(search,page,size));
    req.subscribe((data) => {
      convertDataFromRequestToTable(data,this.table) 
    });
  }

  next () {
    next(this.table);
  }

  previous () {
    previous(this.table);
  }

  visitTable (page: number) {
    if(page === this.table.currentPage) {
      return;
    }
    this.getData('', page,this.table.size);
    this.table.currentPage = page;
  }

  changeTableSize (size: number) {

  }

}
