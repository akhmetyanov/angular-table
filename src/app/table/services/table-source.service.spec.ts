import { TestBed } from '@angular/core/testing';

import { TableSourceService } from './table-source.service';

describe('TableSourceService', () => {
  let service: TableSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
