import {TestBed} from '@angular/core/testing';

import {ContactsService} from './contacts.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ContactsService', () => {
  let service: ContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(ContactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
