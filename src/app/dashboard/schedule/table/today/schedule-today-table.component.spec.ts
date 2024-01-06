import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleTodayTableComponent } from './schedule-today-table.component';


describe('DashboardComponent', () => {
  let component: ScheduleTodayTableComponent;
  let fixture: ComponentFixture<ScheduleTodayTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleTodayTableComponent]
    });
    fixture = TestBed.createComponent(ScheduleTodayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
