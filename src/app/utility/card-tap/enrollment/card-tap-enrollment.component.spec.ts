import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTapComponent } from './card-tap-enrollment.component';

describe('CardTapComponent', () => {
  let component: CardTapComponent;
  let fixture: ComponentFixture<CardTapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardTapComponent]
    });
    fixture = TestBed.createComponent(CardTapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
