import { TestBed } from '@angular/core/testing';

import { LoginRouteService } from './login-route.service';

describe('LoginRouteServiceService', () => {
  let service: LoginRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
