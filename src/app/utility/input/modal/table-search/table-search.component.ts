import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatToDateWord } from 'global/date';
import { CoachTableModal, convertDataFromRequestToTable, employeeTableUrl } from 'global/utils/tableColumns';
import Swal from 'sweetalert2';

@Component({
  selector: 'table-search',
  templateUrl: './table-search.component.html',
  styleUrls: ['./table-search.component.scss']
})
export class TableSearchComponent {

  @Input() data: any = {};
  @Output() dataChange = new EventEmitter<any>();

  table = CoachTableModal

  constructor(private route: ActivatedRoute, private http: HttpClient) { }


  ngOnInit() {
    this.getDataTable();
  }

  getDataTable() {
    this.http.get<any>(employeeTableUrl(this.table.search, 1, 10, 'coach')).subscribe((data: any) => {
      convertDataFromRequestToTable(data, this.table);
      this.table.content.forEach((content) => {
        content.user.birthDate = formatToDateWord(content.user.birthDate);
      });
    });
  }

  getData(data: any): void {
    this.data = data;

    this.dataChange.emit(this.data);

    Swal.fire({
      title: 'Data Assigned!',
      timer: 2000,
      icon: 'success',
      text: '',
    }).then(() => {

    })
  }

  _handleSearchClick() {
    this.getDataTable();
  }
}
