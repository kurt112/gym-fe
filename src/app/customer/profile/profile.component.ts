import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Customer } from '../customer';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  id: string | null = '';
  hotdog: string = 'sdfa'
  customer: Customer = {
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
      middleName: ''
    }
  }
  constructor(private route: ActivatedRoute,private http:HttpClient) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if(this.id !== 'add'){
      const req = this.http.get<Customer>(`${environment.apiUrl}customers/${this.id}`);

      req.subscribe((data) => {
        console.log(data);
        this.customer = data;
      }) 
    }
  }

  submit(customer: NgForm){
    alert('wew');
  }
}
