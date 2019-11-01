import { TestBed } from '@angular/core/testing';

import { NgFormDecoratorsService } from './ng-form-decorators.service';

describe('NgFormDecoratorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgFormDecoratorsService = TestBed.get(NgFormDecoratorsService);
    expect(service).toBeTruthy();
  });
});
