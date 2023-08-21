import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { next, previous, updatePageVisit, changeTableSize, GymClassScheduleTable, GymClassScheduleTableUrl } from 'global/utils/tableColumns';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Schedule } from 'global/utils/schedule';
import Swal from 'sweetalert2';

@Component({
  selector: 'gym-class-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {

  id: string | null = '';
  table = GymClassScheduleTable;
  isLoading = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getGymClassSchedule(this.id);
  }

  getGymClassSchedule(id: string | null) {
    this.isLoading = true;
    this.http.get<any>(GymClassScheduleTableUrl(id)).subscribe((data) => {

      this.table.content = data;

      this.isLoading = false;

      console.log(data);

    });
  }
  _handleDeleteSchedule(scheduleId: any) {
    this.http.delete<Schedule>(`${environment.apiUrl}gym/classes/${this.id}/schedules/${scheduleId}`).subscribe((data: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Schedule Deleted',
        timer: 2000
      }).then(() => this.table.content = this.table.content.filter((data: Schedule) => data.id !== scheduleId))
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Schedule not found',
        text: `${scheduleId} is not existing`,
      })
    })
  }

  async _handleUpdateSchedule(id: any) {
    const schedule: Schedule | undefined = this.table.content.find(scheduled => scheduled.id === id);

    if (schedule === undefined) return;

    const newTimeStart: Date = new Date(schedule.startTime);
    const newTimeEnd: Date = new Date(schedule.endTime);

    console.log(schedule);

    await Swal.fire({
      title: 'Enter New Time',
      html:
        '<label for="time-start" class="form-label fw-semibold">Time Start</label>' +
        '<input type="time" id="time-start" class="swal2-input" style="width: 100%; margin: 0px; margin-bottom: 10px;"/>' +
        '<label for="time-end" class="form-label fw-semibold">Time End</label>' +
        '<input type="time" id="time-end" class="swal2-input" style="width: 100%; margin: 0px;"/>',
      focusConfirm: false,
      preConfirm: () => {
        const timeStart = (<HTMLInputElement>document.getElementById('time-start')).value;
        const timeEnd = (<HTMLInputElement>document.getElementById('time-end')).value;

        if (!timeStart || !timeEnd) return;

        let [startHours, startMins] = timeStart.split(":");
        newTimeStart.setHours(+startHours);
        newTimeStart.setMinutes(+startMins);

        let [endHour, endMins] = timeEnd.split(":");
        newTimeEnd.setHours(+endHour);
        newTimeEnd.setMinutes(+endMins);

        schedule.startTime = newTimeStart;
        schedule.endTime = newTimeEnd;

        this.http.post<Schedule>(`${environment.apiUrl}gym/classes/${this.id}/schedules`, schedule).subscribe((data: any) => {
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Schedule Deleted',
          //   timer: 2000
          // })
        }, err => {
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Schedule not found',
          //   text: `${scheduleId} is not existing`,
          // })
        })


      }
    })

    // if (formValues) {
    //   Swal.fire(JSON.stringify(formValues))
    // }
  }

  next() {
    next(this.table);
  }

  previous() {
    previous(this.table);
  }

  visitTable(page: number) {
    if (page === this.table.currentPage) return;
    // this.getData('', page, this.table.size);
    this.table.currentPage = page;
    updatePageVisit(this.table);
  }

  changeTableSize(size: number) {
    changeTableSize(this.table, size);
    // this.getData('', 1, this.table.size);
  }

  goBack() {
    this.location.back();
  }
}
