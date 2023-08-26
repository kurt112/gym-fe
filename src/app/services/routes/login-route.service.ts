import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginRouteService {

  constructor() { }

  canActivate(): boolean {
    const token: string | null = window.sessionStorage.getItem('token');

    alert(token ===null)
    return token === null;
  }
}
