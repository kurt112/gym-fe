import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/customer/customer';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { GymClass } from '../GymClass';
import { convertNumberToDay, formatDateYYYMMDD } from 'global/date';
import { Schedule } from 'global/utils/schedule';
import { enrollInGymClass } from 'global/utils/endpoint';
import { GymClassType } from 'src/app/configuration/gym-classes-types/GymClassType';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'gym-class-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  id: string = '';
  isLoading = false;
  isEdit = true;
  isNewData = true;
  gymClass: GymClass = {
    id: '',
    name: '',
    gymClassType: {
      createdAt: '',
      name: '',
      updatedAt: '',
      id: '-1',
    },
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
    { day: 0, startTime: '', endTime: '' },
    { day: 1, startTime: '', endTime: '' },
    { day: 2, startTime: '', endTime: '' },
    { day: 3, startTime: '', endTime: '' },
    { day: 4, startTime: '', endTime: '' },
    { day: 5, startTime: '', endTime: '' },
    { day: 6, startTime: '', endTime: '' }
  ];
  isNewSchedule = true;
  instrutor: any = {};

  gymClassTypes: GymClassType[] = []

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  convertDate = (day: number) => {
    if (day < 0 || day > 7) return 'TBA'
    return convertNumberToDay[day];
  }

  async ngOnInit() {

    const routeId = this.route.snapshot.paramMap.get('id');

    if (routeId !== null) {
      this.id = routeId;
      this.enrollMemberUrl = enrollInGymClass(this.id)
    }

    if (this.id !== 'add') {
      this.isNewData = false;
      this.isLoading = true;

      await firstValueFrom(this.http.get<GymClass>(`${environment.apiUrl}gym/classes/${this.id}`)).then(data => {
        console.log(data);

        if (data.instructor) this.instrutor = data.instructor;

        data.schedules?.forEach((schedule: Schedule, i: number) => {
          this.schedules?.forEach((thisSched, i: number) => {
            if (schedule.day === thisSched.day) {
              const endTime: string = (<string>schedule.endTime);
              const startTime: string = (<string>schedule.startTime);
              this.schedules[i] = { day: schedule.day, endTime: endTime.substring(0, 5), startTime: startTime.substring(0, 5) };
            }
          });
        });
        this.gymClass = data;
        this.gymClass.dateStart = formatDateYYYMMDD(data.dateStart);
        this.gymClass.dateEnd = formatDateYYYMMDD(data.dateEnd);
        this.gymClass.schedules = data.schedules;
        this.isLoading = false;
      })

      this.isNewSchedule = false;
    }

    await firstValueFrom(this.http.get<GymClassType[]>(`${environment.apiUrl}gym/classes/types`)).then((data: GymClassType[]) => {
      this.gymClassTypes.push(...data);
    })
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

    delete formValue.schedules;

    if (!this.isNewData) {
      console.log(formValue);

      this.updateGymClass(formValue);
      return;
    }

    this.createGymClass(gymClassForm, formValue);

  }

  createGymClass(gymClassForm: NgForm, gymClass: GymClass) {
    this.http.post<GymClass>(`${environment.apiUrl}gym/classes`, gymClass).subscribe((data: any) => {

      if (this.instrutor !== null || this.instrutor !== undefined) {
        this.http.post<GymClass>(`${environment.apiUrl}gym/classes/${data.id}/assign-instructor/${this.instrutor.id}`, gymClass).subscribe(() => {

        })
      }

      this.createGymClassSchedule(data.id);
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
    this.http.post<GymClass>(`${environment.apiUrl}gym/classes`, gymClass).subscribe((data: any) => {
      this.http.post<GymClass>(`${environment.apiUrl}gym/classes/${data.id}/assign-instructor/${this.instrutor.id}`, gymClass).subscribe(() => {
        this.createGymClassSchedule(data.id);
        Swal.fire({
          title: 'Updated',
          timer: 2000,
          icon: 'success',
          text: data.message,
        }).then(() => {
          this.ngOnInit();
        })
      })
    })
  }

  openModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  createGymClassSchedule(id: string) {

    if (!this.isNewSchedule) {
      return;
    }

    this.schedules = this.schedules.filter(schedule => {
      if (!schedule.startTime || !schedule.endTime) return;

      return schedule;
    });

    this.http.post<Customer>(`${environment.apiUrl}gym/classes/${id}/generate-schedules`, this.schedules).subscribe((data: any) => {
      this.schedules = [
        { day: 0, startTime: '', endTime: '' },
        { day: 1, startTime: '', endTime: '' },
        { day: 2, startTime: '', endTime: '' },
        { day: 3, startTime: '', endTime: '' },
        { day: 4, startTime: '', endTime: '' },
        { day: 5, startTime: '', endTime: '' },
        { day: 6, startTime: '', endTime: '' }
      ]
    })
  }

  _showNewSchedule() {
    const isNewScheduleOpen = !this.isNewSchedule;
    this.isNewSchedule = isNewScheduleOpen;
  }

  selectedGymType(type: GymClassType, existing: string): boolean {
    return type.name === existing;
  }

}
