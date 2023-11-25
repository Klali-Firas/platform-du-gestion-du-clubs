import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoireDemandesComponent } from './histoire-demandes.component';

describe('HistoireDemandesComponent', () => {
  let component: HistoireDemandesComponent;
  let fixture: ComponentFixture<HistoireDemandesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoireDemandesComponent]
    });
    fixture = TestBed.createComponent(HistoireDemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
