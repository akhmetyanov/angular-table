import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableDataStoreService {
  private store: Record<number, any[]> = {};

  constructor() {}

  add(tableId: number, data: any[]) {
    this.store[tableId] = data;
  }

  get(tableId: number) {
    return this.store[tableId] ?? [];
  }
}
