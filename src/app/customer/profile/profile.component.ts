import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { formateDateDDMMYY } from 'global/date';
import { Customer } from '../customer';
import Swal from 'sweetalert2';
import { getInitUser } from 'global/utils/user';
@Component({
  selector: 'customer-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id: string | null = '';
  isLoading = false;
  isEdit = false;
  isNewData = true;
  customer: Customer = {
    rfId: '',
    user: getInitUser
  }
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id !== 'add') {
      this.isNewData = false;
      this.isLoading = true;
      this.http.get<Customer>(`${environment.apiUrl}customers/${this.id}`).subscribe((data) => {
        this.isLoading = false;
        this.customer = data;
        this.customer.user.birthDate = formateDateDDMMYY(this.customer.user.birthDate);
      })
    }
  }

  setSex(sex: string) {
    this.customer.user.sex = sex;
  }

  submit(customerForm: NgForm) {

    const newCustomer = { ...customerForm.value, ...this.customer };

    if (this.isNewData) {
      this.createCustomer(customerForm, newCustomer);
      return;
    }

    this.updateCustomer(newCustomer);

  }

  updateCustomer(customer: Customer) {
    this.http.post<Customer>(`${environment.apiUrl}customers`, customer).subscribe((data: any) => {
      Swal.fire({
        title: 'Update',
        timer: 2000,
        icon: 'success',
        text: data.message,
      }).then(() => {
      })
    })
  }

  createCustomer(customerForm: NgForm, customer: Customer) {
    this.http.post<Customer>(`${environment.apiUrl}customers`, customer).subscribe((data: any) => {
      Swal.fire({
        title: 'Created',
        timer: 2000,
        icon: 'success',
        text: data.message,
      }).then(() => {
        customerForm.resetForm();
      })
    })
  }

}
