import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { formateDateDDMMYY } from 'global/date';
import * as moment from 'moment';
import { BaseChartDirective } from 'ng2-charts';
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

  barChartType: ChartType = 'bar';
  // barChartPlugins = [DataLabelsPlugin];

  barChartData: ChartData<'bar'> = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2012', '2012'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40, 3, 2, 5], label: '10 Day Sale' },
    ],
  };

  constructor(private modal: NgbModal, private http: HttpClient) {

  }

  ngOnInit() {
    this.http.get<Dashboard>(`${environment.apiUrl}gym/1/dashboard`).subscribe((data: Dashboard) => {
      this.dashboard = data;
    })

    const canvas = document.getElementsByTagName("canvas");

    canvas[0].removeAttribute("height");
    canvas[0].removeAttribute("width");

    let currentDate =  moment();

    const barChartDataNewLabel = [];
    
    for(let i=0; i<10; i++){
      barChartDataNewLabel.push(formateDateDDMMYY(currentDate.toDate()));

      currentDate = currentDate.subtract(1, "days");
    }

    this.barChartData.labels = barChartDataNewLabel;

  }

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
    console.log(event, active);
  }

  randomize(): void {
    // Only Change 3 values
    // this.barChartData.datasets[0].data = [
    //   Math.round(Math.random() * 100),
    //   59,
    //   80,
    //   Math.round(Math.random() * 100),
    //   56,
    //   Math.round(Math.random() * 100),
    //   40,
    // ];

    // this.chart?.update();
  }



}
