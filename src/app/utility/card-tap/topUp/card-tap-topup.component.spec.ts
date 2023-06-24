import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTapTopupComponent } from './card-tap-topup.component';

describe('CardTapTopupComponent', () => {
  let component: CardTapTopupComponent;
  let fixture: ComponentFixture<CardTapTopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardTapTopupComponent]
    });
    fixture = TestBed.createComponent(CardTapTopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
