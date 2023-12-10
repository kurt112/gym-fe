import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { formatToDateWord } from 'global/date';
import { topUpByFirstLastMiddleName } from 'global/enpoint/customer';
import { getToken } from 'global/utils/jwt';
import { firstNameLastNameAndMiddleNameTopupPopUpForm } from 'global/utils/pop-up-form';
import { CustomerTable, changeTableSize, convertDataFromRequestToTable, customerTableUrl, next, previous, updatePageVisit } from 'global/utils/tableColumns';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {

  table = CustomerTable
  isLoading = false;
  amount: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getData(this.table.search, this.table.currentPage, this.table.size);
  }

  getData(search: string, page: number, size: number) {
    this.isLoading = true;
    this.http.get<any>(customerTableUrl(search, page, size)).subscribe((data) => {
      convertDataFromRequestToTable(data, this.table)
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

  _handleSearchClick() {
    this.getData(this.table.search, 1, this.table.size);
  }


  async _handleManualTopup() {

    const token = getToken();

    if (token === null) return;

    const { value } = await firstNameLastNameAndMiddleNameTopupPopUpForm()

    if (value) {

      const firstName = value[0];
      const lastName = value[1];
      const middleName = value[2];
      const amount = value[3];

      this.http.post<any>(topUpByFirstLastMiddleName(token, amount, firstName, lastName, middleName), {}).subscribe((data) => {
        convertDataFromRequestToTable(data, this.table)
        this.isLoading = false;
        this.ngOnInit();
        Swal.fire({
          title: "Manual Top-up",
          text: "Top-up is Success",
          icon: "success",
          timer: 500,
        });
      });
    }
  }
}
