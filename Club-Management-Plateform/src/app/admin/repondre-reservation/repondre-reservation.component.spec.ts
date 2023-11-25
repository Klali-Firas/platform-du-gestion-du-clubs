import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepondreReservationComponent } from './repondre-reservation.component';

describe('RepondreReservationComponent', () => {
  let component: RepondreReservationComponent;
  let fixture: ComponentFixture<RepondreReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepondreReservationComponent]
    });
    fixture = TestBed.createComponent(RepondreReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
