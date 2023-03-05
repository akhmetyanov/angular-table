import { Injectable } from '@angular/core';
import { ServerSideSource } from '../model/server-side-source';
import { TableDataStoreService } from './table-data-store.service';

@Injectable()
export class TableSourceService {
  constructor(private dataStore: TableDataStoreService) {}

  buildTableSource(tableId: number, pageSize: number) {
    const data = this.dataStore.get(tableId);
    return new ServerSideSource(data, pageSize);
  }

  buildFilterSource() {}
}
