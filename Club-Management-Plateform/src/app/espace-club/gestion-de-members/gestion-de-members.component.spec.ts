import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDeMembersComponent } from './gestion-de-members.component';

describe('GestionDeMembersComponent', () => {
  let component: GestionDeMembersComponent;
  let fixture: ComponentFixture<GestionDeMembersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionDeMembersComponent]
    });
    fixture = TestBed.createComponent(GestionDeMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
