import { TestBed } from '@angular/core/testing';

import { CustomerFormCreationService } from './customer-form-creation.service';

describe('CustomerFormCreationService', () => {
  let service: CustomerFormCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerFormCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
