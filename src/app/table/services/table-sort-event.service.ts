import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Column } from '../model/column';
import { SortDirections } from '../model/source-sort-state';

type EventStore = Record<number, Record<string, SortDirections>>

@Injectable({
  providedIn: 'root'
})
export class TableSortEventService {

  private events: EventStore = {};
  events$: BehaviorSubject<EventStore> = new BehaviorSubject<EventStore>({});

  constructor() { }

  registerEvent(tableId: number, column: Column) {
    if (!this.events[tableId]) this.events[tableId] = {};
    let changed: boolean = false;
    if (!this.events[tableId][column.column]) {
      changed= true;
      this.events[tableId][column.column] = SortDirections.asc
    }
    if (!changed && this.events[tableId][column.column] && this.events[tableId][column.column] == SortDirections.asc) {
      changed= true;
      this.events[tableId][column.column] = SortDirections.desc
    }
    if (!changed &&  this.events[tableId][column.column] && this.events[tableId][column.column] == SortDirections.desc) {
      delete this.events[tableId][column.column]
    }
    this.events$.next(this.events)
  }
}
