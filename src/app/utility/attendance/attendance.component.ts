import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { updateAttendanceCustomer } from 'global/utils/endpoint';
import { timer } from 'rxjs/internal/observable/timer';
import { Location } from '@angular/common';

@Component({
  selector: 'customer-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent {

  rfIdValue: string = '';
  currentDateAndTime: Date = new Date();
  user: string = 'No ID Detected';
  status: string = 'No Status Yet'
  error: boolean = false;

  constructor(private http: HttpClient, private location: Location) {

  }

  ngOnInit() {
    timer(0, 1000).subscribe(() => {
      this.currentDateAndTime = new Date();
    });
  }

  changed(value: any) {

    if (value.length >= 11) {

      this.http.get<any>(updateAttendanceCustomer(value)).subscribe(
        data => {
          this.user = data.user;
          this.status = data.message;
        },
        e => {
          this.user = e.error.message;
          this.status = 'Invalid Id'
          this.error = true;
          setTimeout(() => {
            this.user = 'No ID Detected';
            this.status = 'No Status Yet'
            this.error = false;
          }, 5000);
        },
        () => {
          setTimeout(() => {
            this.user = 'No ID Detected';
            this.status = 'No Status Yet'
            this.error = false;
          }, 5000);
        })

      setTimeout(() => {
        this.rfIdValue = '';
      }, 1);

    }
  }

  goBack() {
    this.location.back();
  }


}
