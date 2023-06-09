import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { formateDateDDMMYY } from 'global/date';
import { getInitUser } from 'global/utils/user';
import { Employee } from 'src/app/employee/Employee';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'employee-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  id: string | null = '';
  isLoading = false;
  isEdit = false;
  isNewData = true;
  employee: Employee = {
    user: getInitUser
  }
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id !== 'add') {
      this.http.get<Employee>(`${environment.apiUrl}employees/${this.id}`)
        .subscribe((data) => {
          this.isLoading = true;
          this.employee = data;
          this.employee.user.birthDate = formateDateDDMMYY(this.employee.user.birthDate);
        })
      this.isNewData = false;
    }

    this.isLoading = false;
  }

  setSex(sex: string) {
    this.employee.user.sex = sex;
  }

  submit(employeeForm: NgForm) {
    const updatedEmployee = { ...this.employee, ...employeeForm.value };

    if (!this.isNewData) {
      this.updateEmployee(updatedEmployee);
      return;
    }

    this.createEmployee(employeeForm, updatedEmployee);
  }

  createEmployee(employeeForm: NgForm, employee: Employee) {
    this.http.post<Employee>(`${environment.apiUrl}employees`, employee)
      .subscribe((data: any) => {
        Swal.fire({
          title: 'Created',
          timer: 2000,
          icon: 'success',
          text: data.message,
        }).then(() => {
          employeeForm.resetForm();
        });
      })
  }

  updateEmployee(employee: Employee) {
    this.http.put<Employee>(`${environment.apiUrl}employees`, employee)
      .subscribe((data: any) => {
        Swal.fire({
          title: 'Updated',
          timer: 2000,
          icon: 'success',
          text: data.message,
        }).then(() => {
        });
      })
  }
}
