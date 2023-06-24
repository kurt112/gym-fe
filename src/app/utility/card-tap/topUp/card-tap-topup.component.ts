import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { firstValueFrom, timer } from 'rxjs';
import { getUserIdByCustomerRfId, topUpCustomerUrl } from 'global/enpoint/customer';

@Component({
  selector: 'app-card-tap-topup',
  templateUrl: './card-tap-topup.component.html',
  styleUrls: ['./card-tap-topup.component.scss']
})
export class CardTapTopupComponent {

  @Input()
  amount: number = 0;

  rfId: string = '';

  currentDateAndTime: Date = new Date();

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    timer(0, 1000).subscribe(() => {
      this.currentDateAndTime = new Date();
    });
  }

  async rfIdInputChanged(data: any) {

    let userId = null;

    if (data.length === 11) {


      await firstValueFrom(this.http.get<any>(getUserIdByCustomerRfId(this.rfId))).then(result => {
        userId = result.message;
      }).catch(ignored => {
        Swal.fire(
          'Customer not found',
          'Card id cannot be found',
          'error'
        ).then(() => {
          setTimeout(() => {
            this.rfId = '';
          }, 1)
        })
      })

      if (userId == null) return;


      // this.http.post<any>(topUpCustomerUrl('asdas', userId), {

      // }).subscribe(ignored => {
      //   Swal.fire(
      //     'Top up!',
      //     'New balance has been added',
      //     'success'
      //   ).then(() => {
      //     setTimeout(() => {
      //       this.rfId = '';
      //     }, 1)
      //   })
      // })
    }

  }
}
