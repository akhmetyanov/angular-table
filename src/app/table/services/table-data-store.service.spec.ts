import { TestBed } from '@angular/core/testing';

import { TableDataStoreService } from './table-data-store.service';

describe('TableDataStoreService', () => {
  let service: TableDataStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableDataStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
