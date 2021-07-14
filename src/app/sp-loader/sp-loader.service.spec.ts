import { TestBed } from '@angular/core/testing';

import { SpLoaderService } from './sp-loader.service';

describe('SpLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpLoaderService = TestBed.get(SpLoaderService);
    expect(service).toBeTruthy();
  });
});
