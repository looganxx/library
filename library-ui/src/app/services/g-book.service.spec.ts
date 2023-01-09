import { TestBed } from '@angular/core/testing';

import { GBookService } from './g-book.service';

describe('GBookService', () => {
  let service: GBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
