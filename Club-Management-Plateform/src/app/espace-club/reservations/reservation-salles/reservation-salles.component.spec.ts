import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSallesComponent } from './reservation-salles.component';

describe('ReservationSallesComponent', () => {
  let component: ReservationSallesComponent;
  let fixture: ComponentFixture<ReservationSallesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationSallesComponent]
    });
    fixture = TestBed.createComponent(ReservationSallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
