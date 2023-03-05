import { TestBed } from '@angular/core/testing';

import { TableFilterEventService } from './table-filter-event.service';

describe('TableFilterEventService', () => {
  let service: TableFilterEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableFilterEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
