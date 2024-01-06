import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { formatDateYYYMMDD } from 'global/date';
import * as moment from 'moment';
import { BaseChartDirective } from 'ng2-charts';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Dashboard } from './Dashboard';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;


  dashboard: Dashboard = {
    classesCount: 0,
    clientCount: 0,
    coachesCount: 0,
    scheduleCount: 0
  }

  // don't remove the charts initialization !!
  barChartType: ChartType = 'bar';
  barChartData: ChartData<'bar'> = {
    datasets: [
      {
        data: [], label: '10 Day Sale'
      }
    ],
  };

  barChartOptions: ChartConfiguration['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      }
    },
  };

  barChartDataNewLabel: any = [];

  constructor(private modal: NgbModal, private http: HttpClient)  {
  }

  async ngOnInit() {

    let currentDate = moment();
    
    const date = formatDateYYYMMDD(currentDate.toDate());
    
    await firstValueFrom(this.http.get<any>(`${environment.apiUrl}gym/1/dashboard/date-sale/${date}/10`)).then((data) => {
  
      const sortedDateKeys = Object.keys(data).sort();

      const newData: number[] =  sortedDateKeys.map(key => data[key] ? data[key]: 0);

      this.barChartData.datasets[0].data.push(...newData);
      this.barChartDataNewLabel.push(...sortedDateKeys);
      this.barChartData.labels = this.barChartDataNewLabel;
      const canvas = document.getElementsByTagName("canvas");

      canvas[0].removeAttribute("height");
      canvas[0].removeAttribute("width");

      this.chart?.update();
    })

   
    this.http.get<Dashboard>(`${environment.apiUrl}gym/1/dashboard`).subscribe((data: Dashboard) => {
      this.dashboard = data;
    })
    
  }

  // events
  chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    // console.log(event, active);
  }


}
