import { TestBed } from '@angular/core/testing';

import { TableRegisterService } from './table-register.service';

describe('TableRegisterService', () => {
  let service: TableRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
