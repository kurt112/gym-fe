import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import jwt_decode from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public login = new BehaviorSubject<any>({
    isLogin: false
  });

  constructor() {

    const token: string | null = window.sessionStorage.getItem('token');

    let isLogin = true;

    if (token === null) return;

    const decoded: any = jwt_decode("" + token);

    const userId = decoded.userId;

    if (userId === null || userId === undefined) {
      isLogin = false;
    }

    this.login.next({
      isLogin: isLogin
    })
  }
}
