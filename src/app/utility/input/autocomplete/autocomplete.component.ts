import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { autoCompleteEmployee } from 'global/utils/endpoint';
import { BehaviorSubject } from 'rxjs';
import { is } from 'date-fns/locale';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent {

  // this id will be used to return the autocomplete value
  @Input()
  id: string = '-1';

  @Input()
  url: string = '';

  value: string = '';

  @Input()
  label: string = 'default label';

  @Input()
  placeholder: string = 'default placeholder';


  @Output() idChange = new EventEmitter<string>();

  dataList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])

  constructor(private http: HttpClient) {

  }

  valueClicked(data: any): void {

    const { id, label } = data;

    this.value = label
    this.id = id;

    setTimeout(() => {
      this.idChange.emit(id);
    }, 1000)

    const dropdown = document.getElementById("autocompleteData");

    if (dropdown === null) return;

    dropdown.classList.remove("show");

    const input = document.getElementById("myInput");

    if (input === null) return;
    input.classList.remove("border-danger");
  }

  ngOnChanges(e: string) {

    this.id = '-1';

    // setTimeout(() => {
    //   this.idChange.emit(this.id);
    // }, 5000)

    if (e.length === undefined || e.length < 4) return;

    this.http.get<any>(autoCompleteEmployee(e)).subscribe((data: any) => {

      this.dataList.next([...data]);
    })

  }


  focusAutoComplete() {
    const dropdown = document.getElementById("autocompleteData");

    if (dropdown === null) return;

    console.log('focusing');

    dropdown.classList.remove("show");
    dropdown.classList.toggle("show");

  }

  unFocusAutoComplete() {
    const dropdown = document.getElementById("autocompleteData");

    if (dropdown === null) return;

    setTimeout(() => {
      if (+this.id === -1) {
        this.value = '';

        const input = document.getElementById("myInput");
        dropdown.classList.remove("show");

        if (input === null) return;
        input.classList.toggle("border-danger");
      }
    }, 500)
  }
}
