import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { gymClassMembers, convertDataFromRequestToTable, next, previous, updatePageVisit, changeTableSize, GymClassScheduleTable, GymClassScheduleTableUrl } from 'global/utils/tableColumns';
import {Location} from '@angular/common';

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
    });
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
