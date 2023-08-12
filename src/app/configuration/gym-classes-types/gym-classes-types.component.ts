import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GymClassesTypes } from 'global/utils/tableColumns';
import { GymClassType } from './GymClassType';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gym-classes-types',
  templateUrl: './gym-classes-types.component.html',
  styleUrls: ['./gym-classes-types.component.scss']
})
export class GymClassesTypesComponent {

  table = GymClassesTypes;
  isLoading = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location) { }

  gymClasssType: GymClassType = {
    createdAt: '',
    name: '',
    updatedAt: '',
  }

  ngOnInit() {
    this.http.get<any>(`${environment.apiUrl}gym/classes/types`).subscribe((data: any) => {
      this.table.content = data;
    })
  }


  async _handleCreateGymClassType() {
    const { value: name } = await Swal.fire({
      title: 'Enter Gym Class Type',
      input: 'text',
      inputPlaceholder: 'Enter Gym Class Type Name'
    })

    if (name) {

      this.gymClasssType.name = name;

      this.http.post<GymClassType>(`${environment.apiUrl}gym/classes/type`, this.gymClasssType).subscribe((data: GymClassType) => {
        this.table.content.push(data);
        this.gymClasssType = {
          createdAt: '',
          name: '',
          updatedAt: '',
        }
      }, err => {
        Swal.fire({
          icon: 'error',
          title: 'Duplicate Data',
          text: `${name} is already existing`,
        })
      })
    }
  }

  async _handleDeleteGymClassType(id: any) {
    this.http.delete<GymClassType>(`${environment.apiUrl}gym/classes/type?id=${id}`).subscribe((data: GymClassType) => {
      this.table.content = this.table.content.filter((data: GymClassType) => data.id !== id);
      Swal.fire({
        icon: 'success',
        title: 'Gym Class Type Deleted',
        timer: 500
      })
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Cant delete',
        timer: 500
      })
    })
  }

  goBack() {
    this.location.back();
  }
}
