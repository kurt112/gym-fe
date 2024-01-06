import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { formatToDateWord } from "global/date";
import { convertDataFromRequestToTable, ScheduleTodayTable, todayScheduleTalbeUrl } from "global/utils/tableColumns";

@Component({
  selector: 'schedule-today-table',
  templateUrl: './schedule-today-table.component.html',
  styleUrls: ['./schedule-today-table.scss']
})
export class ScheduleTodayTableComponent {
  table = ScheduleTodayTable;
  isLoading = false;

  constructor(private http: HttpClient) {
    this.getData('', this.table.currentPage, this.table.size);
  }

  getData(search: string, page: number, size: number) {
    this.isLoading = true;
    this.http.get<any>(todayScheduleTalbeUrl('1')).subscribe((data) => {
      console.log(data);
      
      this.table.content = data;
      this.isLoading = false;
    });
  }
}