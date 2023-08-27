import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { Dashboard } from './Dashboard';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  dashboard: Dashboard = {
    classesCount: 0,
    clientCount: 0,
    coachesCount: 0,
    scheduleCount: 0
  }

  constructor(private modal: NgbModal, private http: HttpClient) {

  }

  ngOnInit() {
    this.http.get<Dashboard>(`${environment.apiUrl}gym/1/dashboard`).subscribe((data: Dashboard) => {
      this.dashboard = data;
    })

  }




}
