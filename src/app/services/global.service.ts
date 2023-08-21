import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  
  public login = new BehaviorSubject<any>({
    isLogin: false
  });

  constructor() { }
}
