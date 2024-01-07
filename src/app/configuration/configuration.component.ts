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

  isEditMode:boolean = false;

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


  _toggleEditMode(state: boolean) {
    this.isEditMode = state;
  }

  _save() {
    this._toggleEditMode(false);
  }

  _invalidateCache() {
    alert('to be implemented')
  }

}
