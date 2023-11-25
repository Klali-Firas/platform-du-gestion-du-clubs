import { TestBed } from '@angular/core/testing';

import { MembersServiceService } from './members-service.service';

describe('MembersServiceService', () => {
  let service: MembersServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembersServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
