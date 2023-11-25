import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationMaterialComponent } from './reservation-material.component';

describe('ReservationMaterialComponent', () => {
  let component: ReservationMaterialComponent;
  let fixture: ComponentFixture<ReservationMaterialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationMaterialComponent]
    });
    fixture = TestBed.createComponent(ReservationMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
