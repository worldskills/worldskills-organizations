import { TestBed } from '@angular/core/testing';

import { PhonesService } from './phones.service';

describe('PhonesService', () => {
  let service: PhonesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhonesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
