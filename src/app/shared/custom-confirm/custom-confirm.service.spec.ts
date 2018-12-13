import { TestBed } from '@angular/core/testing';

import { CustomConfirmService } from './custom-confirm.service';

describe('CustomConfirmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomConfirmService = TestBed.get(CustomConfirmService);
    expect(service).toBeTruthy();
  });
});
