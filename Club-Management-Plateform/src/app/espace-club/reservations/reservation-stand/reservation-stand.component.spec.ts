import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationStandComponent } from './reservation-stand.component';

describe('ReservationStandComponent', () => {
  let component: ReservationStandComponent;
  let fixture: ComponentFixture<ReservationStandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationStandComponent]
    });
    fixture = TestBed.createComponent(ReservationStandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
