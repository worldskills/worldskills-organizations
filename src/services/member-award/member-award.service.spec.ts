import { TestBed } from '@angular/core/testing';

import { MemberAwardService } from './member-award.service';

describe('MemberAwardService', () => {
  let service: MemberAwardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberAwardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
