import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { autoCompleteEmployee } from 'global/utils/endpoint';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent {

  @Input()
  url: string = '';

  @Input()
  value: string = '';

  @Input()
  label: string = 'default label';

  @Input()
  placeholder: string = 'default placeholder';


  myData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])

  constructor(private http: HttpClient) {

  }

  changeValue(value: string): void {
    this.value = value;
  }

  ngOnChanges(e: any) {
    this.http.get<any>(autoCompleteEmployee(e)).subscribe((data: any) => {
      this.myData.next([...data]);
    })
  }

}
