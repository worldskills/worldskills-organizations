import { TestBed } from '@angular/core/testing';

import { OrganizationsService } from './organizations.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('OrganizationsService', () => {
  let service: OrganizationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(OrganizationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
