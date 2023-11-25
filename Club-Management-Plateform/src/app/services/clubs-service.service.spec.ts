import { TestBed } from '@angular/core/testing';

import { ClubsServiceService } from './clubs-service.service';

describe('ClubsServiceService', () => {
  let service: ClubsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
