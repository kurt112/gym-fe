import { TestBed } from '@angular/core/testing';

import { UserFormValidationService } from './user-form-validation.service';

describe('UserFormValidationService', () => {
  let service: UserFormValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFormValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
