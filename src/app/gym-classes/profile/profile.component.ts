import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/customer/customer';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { GymClass } from '../GymClass';
import { convertNumberToDay, formatTimeToShortTime, formateDateDDMMYY } from 'global/date';
import { Transferlist } from 'global/utils/tranferList';
import { Schedule } from 'global/utils/schedule';
import { enrollInGymClass } from 'global/utils/endpoint';

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
  id: string = '';
  isLoading = false;
  isEdit = true;
  isNewData = true;
  gymClass: GymClass = {
    id: '',
    name: '',
    type: '',
    dateStart: '',
    dateEnd: '',
    schedules: [],
    instructor: null,
    session: 0,
    allowedNonMembers: false
  }
  isModalOpen = false;
  enrollMemberUrl = '';
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
    const routeId = this.route.snapshot.paramMap.get('id');

    if(routeId !== null){
      this.id = routeId;
      this.enrollMemberUrl = enrollInGymClass(this.id)
    }

    if (this.id !== 'add') {
      this.isNewData = false;
      this.isLoading = true;

      this.http.get<GymClass>(`${environment.apiUrl}gym/classes/${this.id}`).subscribe((data) => {
        console.log(data);
        
        data.schedules.forEach((schedule: Schedule, i: number) => {
          this.schedules.forEach((thisSched, i: number) => {
            if (schedule.day === thisSched.day) {
              this.schedules[i] = { day: schedule.day, endTime: schedule.endTime.substring(0, 5), startTime: schedule.startTime.substring(0, 5) };
            }
          });
        });
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

  identify(index: any, item: any) {
    return item.day;
  }

  submit(gymClassForm: NgForm) {

    const formValue: GymClass = gymClassForm.value;

    delete formValue.instructor;

    if (this.id !== null && this.id !== 'add') formValue.id = this.id;

    this.schedules = this.schedules.filter(schedule => {
      if (!schedule.startTime || !schedule.endTime) return;

      return schedule;
    });

    formValue.schedules = this.schedules;

    if (!this.isNewData) {
      this.updateGymClass(formValue);
      return;
    }

    this.createGymClass(gymClassForm, formValue);
  }

  createGymClass(gymClassForm: NgForm, gymClass: GymClass) {
    this.http.post<Customer>(`${environment.apiUrl}gym/classes`, gymClass).subscribe((data: any) => {
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

  updateGymClass(gymClass: GymClass) {
    this.http.post<Customer>(`${environment.apiUrl}gym/classes`, gymClass).subscribe((data: any) => {
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
        title: 'Updated',
        timer: 2000,
        icon: 'success',
        text: data.message,
      }).then(() => {
        this.ngOnInit();
      })
    })
  }

  openModal() {
    this.isModalOpen = !this.isModalOpen;
  }

}
