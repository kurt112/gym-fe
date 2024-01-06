import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { daysDropDown, formatDateYYYMMDD, monthsDropDown, weeksDropDown, yearsDropDown } from 'global/date';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Membership } from '../Membership';
import { next, previous, updatePageVisit, changeTableSize, MembershipWithUserTable, membershipMembersTableUrl, convertDataFromRequestToTable } from 'global/utils/tableColumns';
import { MembershipWithUser } from '../MembershipWithUser';
import { enrollInMembership } from 'global/utils/endpoint';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  id: string = '';
  isLoading = false;
  isNewData = true;
  years: number[] = yearsDropDown;
  months: number[] = monthsDropDown;
  weeks: number[] = weeksDropDown;
  days: number[] = daysDropDown;
  isModalOpen = false;
  enrollMemberUrl = '';

  membership: Membership = {
    code: '',
    price: 0,
    membershipPromoExpiration: '',
    durationDescription: '',
    name: '',
    year: 0,
    day: 0,
    week: 0,
    month: 0,
    members: [],
    charge: 'MONTHLY'
  }
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {

    const routeId: string | null = this.route.snapshot.paramMap.get('id');

    if(routeId !== null){
      this.id = routeId;
      this.enrollMemberUrl = enrollInMembership(this.id);
    }

    if (this.id !== 'add') {
      this.isLoading = true;
      this.http.get<Membership>(`${environment.apiUrl}gym/memberships/${this.id}`).subscribe((data) => {
        this.membership = data;
        this.membership.membershipPromoExpiration = formatDateYYYMMDD(this.membership.membershipPromoExpiration);
        this.isLoading = false;
      });

      this.isNewData = false;
    }
  }

  setDropdownValue(data: string, value: number) {
    if (data === 'year') {
      this.membership.year = value;
    }
    switch (data) {
      case 'year':
        this.membership.year = value;
        break;
      case 'month':
        this.membership.month = value;
        break;
      case 'day':
        this.membership.day = value;
        break;
      case 'week':
        this.membership.week = value;
        break;
      default:
        alert('Invalid')
    }

  }

  submit(membership: NgForm) {

    const updatedMembership = { ...membership.value, ...this.membership };

    if (!this.isNewData) {
      console.log(updatedMembership);

      this.updateMembership(updatedMembership);
      return;
    }


    this.createNewMembership(membership, updatedMembership);
  }

  createNewMembership(membershipForm: NgForm, membership: Membership) {
    this.http.post<Membership>(`${environment.apiUrl}gym/memberships`, membership).subscribe((data: any) => {
      this.membership.year = 0;
      this.membership.day = 0;
      this.membership.week = 0;
      this.membership.month = 0;
      Swal.fire({
        title: 'Created',
        timer: 2000,
        icon: 'success',
        text: data.message,
      }).then(() => {
        membershipForm.resetForm();
      });
    })
  }


  updateMembership(membership: Membership) {
    this.http.put<Membership>(`${environment.apiUrl}gym/memberships/${membership.id}`, membership, {
      headers: {
        'Accept': 'application/json',
        'Access-Control-Request-Method': 'PATCH'
      },
    }).subscribe((data: any) => {
      Swal.fire({
        title: 'Updated',
        timer: 2000,
        icon: 'success',
        text: data.message,
      }).then(() => {
      });
    })
  }


  openModal() {
    this.isModalOpen = !this.isModalOpen;
  }
}
