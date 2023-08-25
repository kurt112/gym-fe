import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location, public globalService: GlobalService) {

  }

  goBack() {
    this.location.back();
    this.globalService.login.next({
      isLogin: false
    })
  }

  login() {
    this.globalService.login.next({
      isLogin: true
    })

    this.location.go('/dashboard')
  }
}
