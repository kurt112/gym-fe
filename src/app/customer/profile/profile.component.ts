import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { formateDateDDMMYY } from 'global/date';
import { Customer } from '../customer';
import Swal from 'sweetalert2';
@Component({
  selector: 'customer-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id: string | null = '';
  isLoading = false;
  customer: Customer = {
    user: {
      birthDate: new Date(Date.now()).toString(),
      firstName: '',
      lastName: '',
      suffix: '',
      email: '',
      password: '',
      cellphone: '',
      sex: '',
      rfID: '',
      bmi: '',
      bmiNumber: '',
      weight: '',
      height: '',
      middleName: '',
      role: 'customer'
    }
  }
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id !== 'add') {
      const req = this.http.get<Customer>(`${environment.apiUrl}customers/${this.id}`);
      this.isLoading = true;
      req.subscribe((data) => {
        this.isLoading = false;
        this.customer = data;
        this.customer.user.birthDate = formateDateDDMMYY(this.customer.user.birthDate);
      })
    }
  }

  setSex(sex: string) {
    this.customer.user.sex = sex;
  }

  submit(customer: NgForm) {
    const req = this.http.post<Customer>(`${environment.apiUrl}customers`, customer.value);
    req.subscribe((data: any) => {
      Swal.fire({
        title: 'Created',
        timer: 2000,
        icon: 'success',
        text: data.message,
      }).then(() => {
        customer.resetForm();
      })
    })
  }
}
