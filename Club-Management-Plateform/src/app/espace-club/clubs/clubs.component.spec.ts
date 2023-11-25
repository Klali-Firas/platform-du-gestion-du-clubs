import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubsComponent } from './clubs.component';

describe('ClubsComponent', () => {
  let component: ClubsComponent;
  let fixture: ComponentFixture<ClubsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClubsComponent]
    });
    fixture = TestBed.createComponent(ClubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
