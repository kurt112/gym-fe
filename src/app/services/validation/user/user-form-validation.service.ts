import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserFormValidationService {
  userGroupForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    reTypePassword: ['', Validators.required],
    cellphone: ['', Validators.required],
    birthDate: new Date(Date.now()).toString(),
    rfID: ['', Validators.required],
    bmi: '',
    bmiNumber: '',
    weight: '',
    height: '',
    middleName: '',
    role: 'Customer',
    cardValue: 0,
    pointsAmount: 0,
    suffix: '',
    sex: 'Male'
  })
  constructor(private fb: FormBuilder) { }
}
