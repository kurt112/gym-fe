import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginRouteService {

  constructor() { }

  canActivate(): boolean {
    const token: string | null = window.sessionStorage.getItem('token');
    

    return token === null;
  }
}
