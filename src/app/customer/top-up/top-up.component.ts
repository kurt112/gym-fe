import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { firstValueFrom, timer } from 'rxjs';
import { getUserIdByCustomerRfId, topUpCustomerUrl } from 'global/enpoint/customer';
import Swal from 'sweetalert2';

@Component({
  selector: 'customer-top-up',
  templateUrl: './top-up.component.html',
  styleUrls: ['./top-up.component.scss']
})
export class TopUpComponent {

  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location) { }

  rfId: string = '';
  isEnterAmountShowing: boolean = false;

  currentDateAndTime: Date = new Date();

  ngOnInit() {
    timer(0, 1000).subscribe(() => {
      this.currentDateAndTime = new Date();
    });
  }

  async rfIdInputChanged(data: any) {

    let userId: string = '';

    if (data.length >= 11) {
      await firstValueFrom(this.http.get<any>(getUserIdByCustomerRfId(this.rfId))).then(result => {
        userId = result.message;
      }).catch(ignored => {
        this.isEnterAmountShowing = true;
        Swal.fire(
          'Customer not found',
          'Card id cannot be found',
          'error'
        ).then(() => {
          this.isEnterAmountShowing = false;
          setTimeout(() => {
            this.rfId = '';
          }, 1)
        })
      })

      if (userId === '') return;

      this.isEnterAmountShowing = true;

      const token: string | null = window.sessionStorage.getItem('token');

      if (token === null) {
        return alert('Please Login')
      }

      Swal.fire({
        title: 'Please enter amount',
        input: 'number',
        inputAutoFocus: true,
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Top up',
        showLoaderOnConfirm: true,
      }).then((result) => {
        this.isEnterAmountShowing = false;
        if (result.isConfirmed) {
          this.http.post<any>(topUpCustomerUrl(token, userId, result.value), {
          }).subscribe(ignored => {
            Swal.fire(
              'Top up!',
              'New balance has been added',
              'success'
            ).then(() => {

            })
          })
        }
        setTimeout(() => {
          this.rfId = '';
        }, 1)
      })
    }
  }
  goBack() {
    this.location.back();
  }
}
