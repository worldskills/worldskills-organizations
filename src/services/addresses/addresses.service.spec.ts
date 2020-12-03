import {TestBed} from '@angular/core/testing';

import {AddressesService} from './addresses.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AddressesService', () => {
  let service: AddressesService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(AddressesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
