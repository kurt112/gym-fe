import { Component, Input } from '@angular/core';
import { Schedule } from 'global/utils/schedule';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {
  @Input()
  schedulesInput: Schedule[] = [];

  schedules: Schedule[] = [];

  ngInit() {

  }
}
