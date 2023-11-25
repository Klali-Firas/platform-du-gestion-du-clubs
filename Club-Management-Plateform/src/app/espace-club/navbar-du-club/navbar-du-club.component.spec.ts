import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarDuClubComponent } from './navbar-du-club.component';

describe('NavbarDuClubComponent', () => {
  let component: NavbarDuClubComponent;
  let fixture: ComponentFixture<NavbarDuClubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarDuClubComponent]
    });
    fixture = TestBed.createComponent(NavbarDuClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
