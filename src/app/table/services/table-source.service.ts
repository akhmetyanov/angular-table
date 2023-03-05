import { Injectable } from '@angular/core';
import { Column } from '../model/column';
import { ServerSideSource } from '../model/server-side-source';
import { TableDataStoreService } from './table-data-store.service';

@Injectable()
export class TableSourceService {
  constructor(private dataStore: TableDataStoreService) {}

  buildTableSource(tableId: number, pageSize: number) {
    const data = this.dataStore.get(tableId);
    return new ServerSideSource(data, pageSize);
  }

  buildFilterSource(tableId: number, pageSize: number, column: Column) {
    const data = this.dataStore.get(tableId).map((value) => {
      let o: any = {};
      o[column.column] = value[column.column];
      return o;
    });
    return new ServerSideSource(data, pageSize, true);
  }
}
