import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterielCardComponent } from './materiel-card.component';

describe('MaterielCardComponent', () => {
  let component: MaterielCardComponent;
  let fixture: ComponentFixture<MaterielCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterielCardComponent]
    });
    fixture = TestBed.createComponent(MaterielCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
