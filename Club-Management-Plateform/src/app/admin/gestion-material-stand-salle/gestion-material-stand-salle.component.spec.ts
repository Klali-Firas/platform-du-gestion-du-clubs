import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMaterialStandSalleComponent } from './gestion-material-stand-salle.component';

describe('GestionMaterialStandSalleComponent', () => {
  let component: GestionMaterialStandSalleComponent;
  let fixture: ComponentFixture<GestionMaterialStandSalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionMaterialStandSalleComponent]
    });
    fixture = TestBed.createComponent(GestionMaterialStandSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
