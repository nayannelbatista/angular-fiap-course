import { TestBed } from '@angular/core/testing';

import { BooksState } from './books-state';

describe('BooksState', () => {
  let service: BooksState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
