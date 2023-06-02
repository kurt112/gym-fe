import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { formateDateDDMMYY } from 'global/date';
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
  employee: Employee = {
    user:{
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
      role: 'employee'
    }
  }
  constructor(private route: ActivatedRoute,private http:HttpClient) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if(this.id !== 'add'){
      const req = this.http.get<Employee>(`${environment.apiUrl}employees/${this.id}`);
      this.isLoading = true;
      req.subscribe((data) => {
        this.isLoading = false;
        this.employee = data;
        this.employee.user.birthDate = formateDateDDMMYY(this.employee.user.birthDate);
      }) 
    }
  }

  setSex(sex: string) {
    this.employee.user.sex = sex;
  }

  submit(employee: NgForm){
    const req = this.http.post<Employee>(`${environment.apiUrl}employees`,employee.value);
    req.subscribe((data:any) => {
      Swal.fire({
        title: 'Created',
        timer: 2000,
        icon: 'success',
        text: data.message,
      }).then(() => {
        employee.resetForm();
      });
    })
  }
}
