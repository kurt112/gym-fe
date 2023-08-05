import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Store } from './Store';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']

})
export class StoreComponent {

  store: Store = {
    amountNeedToEarnOnePoint: 1,
    createdAt: '',
    name: 'Default',
    updateAt: '',
    id: -1,
    email: 'DefaultEmail@email.com'
  };

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.http.get<any>(`${environment.apiUrl}gym/1`).subscribe((data: Store) => {
      this.store = data;
    })

  }
}
