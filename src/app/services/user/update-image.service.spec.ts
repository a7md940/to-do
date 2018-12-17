import { TestBed } from '@angular/core/testing';

import { UpdateImageService } from './update-image.service';

describe('UpdateImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateImageService = TestBed.get(UpdateImageService);
    expect(service).toBeTruthy();
  });
});
