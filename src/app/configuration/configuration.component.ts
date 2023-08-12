import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Store } from '../store/Store';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent {
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
