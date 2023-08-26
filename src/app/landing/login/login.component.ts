import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GlobalService } from 'src/app/services/global.service';
import { loginByUserNameAndPassword } from 'global/utils/endpoint';
import { Credentials } from './Credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  credential: Credentials = {
    username: '',
    password: '',
  }

  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location, public globalService: GlobalService) {

  }

  goBack() {
    this.location.back();
    this.globalService.login.next({
      isLogin: false
    })
  }

  login() {
    this.http.post<any>(loginByUserNameAndPassword(), this.credential).subscribe((data) => {
      window.sessionStorage.setItem('token', data.token);
      this.location.go('/dashboard')
      this.globalService.login.next({
        isLogin: true
      })
    }, (err) => {

    });


  }
}
