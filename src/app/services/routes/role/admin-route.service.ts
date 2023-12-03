import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode'
@Injectable({
  providedIn: 'root'
})
export class AdminRouteService {

  constructor() {

  }

  canActivate(): boolean {
    return true;
    const token: string | null = window.sessionStorage.getItem('token');

    if (token === null) return false;


    const tokenInfo: any = jwt_decode("" + token);


    console.log(tokenInfo);
    
    return tokenInfo.role.toLowerCase() === 'admin';
  }
}
