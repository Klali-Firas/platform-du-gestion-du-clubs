import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionReservarionComponent } from './gestion-reservarion.component';

describe('GestionReservarionComponent', () => {
  let component: GestionReservarionComponent;
  let fixture: ComponentFixture<GestionReservarionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionReservarionComponent]
    });
    fixture = TestBed.createComponent(GestionReservarionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
