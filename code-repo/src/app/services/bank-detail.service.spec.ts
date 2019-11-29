import { TestBed } from '@angular/core/testing';

import { BankDetailService } from './bank-detail.service';

describe('BankDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BankDetailService = TestBed.get(BankDetailService);
    expect(service).toBeTruthy();
  });
});
