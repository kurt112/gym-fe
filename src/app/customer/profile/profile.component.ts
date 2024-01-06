import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { formatDateYYYMMDD } from 'global/date';
import { Customer } from '../customer';
import Swal from 'sweetalert2';
import { getInitUser } from 'global/utils/user';
import { UserFormValidationService } from 'src/app/services/validation/user/user-form-validation.service';
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

  userGroup: any = {}

  constructor(private route: ActivatedRoute, private http: HttpClient, public userForm: UserFormValidationService) {
    this.userGroup = this.userForm.userGroupForm
    console.log(this.userGroup);

    // this.userGroup = new FormGroup({
    //   firstName: new FormControl(''),
    // })
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id !== 'add') {
      this.isNewData = false;
      this.isLoading = true;
      this.http.get<Customer>(`${environment.apiUrl}customers/${this.id}`).subscribe((data) => {
        this.isLoading = false;
        this.customer = data;
        this.customer.user.birthDate = formatDateYYYMMDD(this.customer.user.birthDate);
      })

      return;
    }

    this.customer.user.role = 'CUSTOMER';
  }

  setSex(sex: string) {
    this.customer.user.sex = sex;
  }

  submit(customerForm: NgForm) {

    let newCustomer = { ...customerForm.value, ...this.customer };
    console.log(newCustomer);

    // newCustomer.user = { ...this.userGroupForm.value }


    console.log(newCustomer);

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

  get isFirstNameInvalid() {

    // console.log(this.userGroup.userGroupForm.get('firstName'));

    return this.userGroup.get('firstName')?.invalid;
  }

}
