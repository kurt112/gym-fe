import { TestBed } from '@angular/core/testing';

import { EmployeeFormCreationService } from './employee-form-creation.service';

describe('EmployeeFormCreationService', () => {
  let service: EmployeeFormCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeFormCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
