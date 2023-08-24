import { TestBed } from '@angular/core/testing';

import { OrganizationAwardService } from './organization-award.service';

describe('OrganizationAwardService', () => {
  let service: OrganizationAwardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizationAwardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
