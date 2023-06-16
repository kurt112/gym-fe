import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-card-tap',
  templateUrl: './card-tap.component.html',
  styleUrls: ['./card-tap.component.scss']
})
export class CardTapComponent {

  @Input() focus = false;
  rfId: string = '';

  currentDateAndTime: Date = new Date();

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    timer(0, 1000).subscribe(() => {
      this.currentDateAndTime = new Date();
    });
  }

  rfIdInputChanged(data: any) {
    console.log(data);
    
    if (data.length === 11) {
      setTimeout(() => {
        this.rfId = '';
      }, 1)
    }
  }

}
