import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoireReservationsComponent } from './histoire-reservations.component';

describe('HistoireReservationsComponent', () => {
  let component: HistoireReservationsComponent;
  let fixture: ComponentFixture<HistoireReservationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoireReservationsComponent]
    });
    fixture = TestBed.createComponent(HistoireReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
