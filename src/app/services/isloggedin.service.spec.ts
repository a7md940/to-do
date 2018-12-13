import { TestBed } from '@angular/core/testing';

import { IsloggedinService } from './isloggedin.service';

describe('IsloggedinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsloggedinService = TestBed.get(IsloggedinService);
    expect(service).toBeTruthy();
  });
});
