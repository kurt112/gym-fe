import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymClassesTypesComponent } from './gym-classes-types.component';

describe('GymClassesTypesComponent', () => {
  let component: GymClassesTypesComponent;
  let fixture: ComponentFixture<GymClassesTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GymClassesTypesComponent]
    });
    fixture = TestBed.createComponent(GymClassesTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
