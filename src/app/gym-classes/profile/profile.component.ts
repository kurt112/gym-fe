import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/customer/customer';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { GymClass } from '../GymClas';
import { convertNumberToDay, formatTimeToShortTime, formateDateDDMMYY } from 'global/date';
import { Transferlist } from 'global/utils/tranferList';
import { Schedule } from 'global/utils/schedule';

@Component({
  selector: 'gym-class-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  transferList: Transferlist = {
    leftData: [{
      id: 1,
      displayData: 'KURT sdjfkl;asjdf'
    }],
    leftPlaceHolder: `Search Member's`,
    leftTitle: `Available Member's`,
    rightData: [{
      id: 2,
      displayData: 'Kurt Lupin Orioquer'
    }],
    rightPlaceHolder: `Search Member's`,
    rightTitle: `Current Member's`
  }
  id: string | null = '';
  isLoading = true;
  isEdit = true;
  gymClass: GymClass = {
    id: '',
    name: '',
    type: '',
    dateStart: '',
    dateEnd: '',
    schedules: [],
    instructor: null,
  }

  schedules: Schedule[] = [
    { day: 1, startTime: '', endTime: '' },
    { day: 2, startTime: '', endTime: '' },
    { day: 3, startTime: '', endTime: '' },
    { day: 4, startTime: '', endTime: '' },
    { day: 5, startTime: '', endTime: '' },
    { day: 6, startTime: '', endTime: '' },
    { day: 7, startTime: '', endTime: '' }
  ];
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  convertDate = (day: number) => {
    if (day <= 0 || day > 7) return 'TBA'
    return convertNumberToDay[day - 1];
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id !== 'add') {
      const req = this.http.get<GymClass>(`${environment.apiUrl}gym/classes/${this.id}`);
      this.isLoading = true;
      req.subscribe((data) => {
        if (data.schedules !== undefined) {
         
        }

        // data.schedules?.forEach(schedule => {
        //   if(schedule.day === this.schedules[0].day){
          
        //   }
          
        //   return schedule;
        // })
        this.schedules[0].startTime = data.schedules[0].startTime;
        

        this.gymClass = data;
        this.gymClass.dateStart = formateDateDDMMYY(data.dateStart);
        this.gymClass.dateEnd = formateDateDDMMYY(data.dateEnd);
        this.gymClass.schedules = data.schedules;
        this.isLoading = false;
      })
    }


  }

  setEdit() {
    const temp = this.isEdit;
    this.isEdit = !temp;
  }

  identify(index:any, item:any) {
    return item ? item.day: undefined;
 }

  submit(gymClassForm: NgForm) {

    const formValue: GymClass = gymClassForm.value;

    delete formValue.instructor;

    this.schedules = this.schedules.filter(schedule => {
      if (!schedule.startTime || !schedule.endTime) return;

      return schedule;
    });

    formValue.schedules = this.schedules;

    const req = this.http.post<Customer>(`${environment.apiUrl}gym/classes`, formValue);

    req.subscribe((data: any) => {
      this.schedules = [
        { day: 1, startTime: '', endTime: '' },
        { day: 2, startTime: '', endTime: '' },
        { day: 3, startTime: '', endTime: '' },
        { day: 4, startTime: '', endTime: '' },
        { day: 5, startTime: '', endTime: '' },
        { day: 6, startTime: '', endTime: '' },
        { day: 7, startTime: '', endTime: '' }
      ]
      Swal.fire({
        title: 'Created',
        timer: 2000,
        icon: 'success',
        text: data.message,
      }).then(() => {
        gymClassForm.resetForm();
      })
    })
  }
}
