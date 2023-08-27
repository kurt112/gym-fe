import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router,} from '@angular/router';
import { Location } from '@angular/common';
import { GlobalService } from 'src/app/services/global.service';
import { loginByUserNameAndPassword } from 'global/utils/endpoint';
import { Credentials } from './Credentials';
import { Subject } from 'rxjs';
import { LoginRouteService } from 'src/app/services/routes/login-route.service';

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
  refresh = new Subject<void>();

  constructor(private router:Router, private route: ActivatedRoute, private http: HttpClient, private location: Location, public globalService: GlobalService, private loginrouteService: LoginRouteService) {
    if (this.globalService.login.value.isLogin === true) {
    }
  }

  goBack() {
    this.location.back();
    this.globalService.login.next({
      isLogin: false
    })
  }

  login() {
    this.http.post<any>(loginByUserNameAndPassword(), this.credential).subscribe((data) => {
      this.globalService.login.next({
        isLogin: true
      })
      window.sessionStorage.setItem('token', data.token);

      this.router.navigate(['/dashboard'])
      
    }, (err) => {


    }, () => {

    });


  }
}
