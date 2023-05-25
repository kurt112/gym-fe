import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymClassesComponent } from './gym-classes.component';

describe('GymClassesComponent', () => {
  let component: GymClassesComponent;
  let fixture: ComponentFixture<GymClassesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GymClassesComponent]
    });
    fixture = TestBed.createComponent(GymClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
