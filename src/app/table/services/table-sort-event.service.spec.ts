import { TestBed } from '@angular/core/testing';

import { TableSortEventService } from './table-sort-event.service';

describe('TableSortEventService', () => {
  let service: TableSortEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableSortEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
