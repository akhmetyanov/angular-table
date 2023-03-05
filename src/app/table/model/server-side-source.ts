import { Source } from './source';
import { SourceState } from './source-state';
import { cloneDeep, orderBy, unionBy } from 'lodash';

export class ServerSideSource implements Source {
  private values: any[];
  private state: SourceState;
  private distinct: boolean;

  constructor(values: any[], pageSize: number, distinct: boolean = false) {
    this.values = values;
    this.distinct = distinct;
    this.state = new SourceState(pageSize);
  }

  current(): any[] {
    if (this.values.length == 0) return [];
    let values = cloneDeep(this.values);
    const state = this.state.getState();
    if (this.distinct) {
      values = unionBy(this.values, Object.keys(this.values[0])[0]);
      values = orderBy(values, Object.keys(this.values[0]));
    }
    return values.slice(state.from, state.to);
  }

  next(): any[] {
    this.state.setNextPageState();
    return this.current();
  }

  previos(): any[] {
    this.state.setPreviosPageState();
    return this.current();
  }
}
