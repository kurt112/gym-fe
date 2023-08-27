import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private router: Router, private globalService: GlobalService) {

  }

  _handleLogout() {

    window.sessionStorage.clear();
    this.router.navigate(['/'])
    this.globalService.login.next({
      isLogin: false
    })
  }
}
