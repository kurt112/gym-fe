import { Component } from '@angular/core';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gym-fe';
  isLogin: boolean = false;

  constructor(public globalService: GlobalService) {

    this.globalService.login.subscribe({
      next: newValue => this.isLogin = newValue.isLogin
    });

  }
}
