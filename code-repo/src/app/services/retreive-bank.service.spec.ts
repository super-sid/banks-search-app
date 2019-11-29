import { TestBed } from '@angular/core/testing';

import { RetreiveBankService } from './retreive-bank.service';

describe('RetreiveBankService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RetreiveBankService = TestBed.get(RetreiveBankService);
    expect(service).toBeTruthy();
  });
});
