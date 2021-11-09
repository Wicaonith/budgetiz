import { TestBed } from '@angular/core/testing';

import { UndersectionService } from './undersection.service';

describe('UndersectionService', () => {
  let service: UndersectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UndersectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
