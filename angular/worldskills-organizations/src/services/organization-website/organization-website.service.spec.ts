import {TestBed} from '@angular/core/testing';
import {OrganizationWebsiteService} from './organization-website.service';

describe('OrganizationWebsiteService', () => {
  let service: OrganizationWebsiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizationWebsiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
