import { Source } from './source';
import { SourceState } from './source-state';
import { cloneDeep, filter, orderBy, unionBy } from 'lodash';
import { SourceFilterState, SourceFilterType } from './source-filter-state';

export class ServerSideSource implements Source {
  private values: any[];
  private state: SourceState;
  private distinct: boolean;

  filterState: SourceFilterState;

  constructor(values: any[], pageSize: number, distinct: boolean = false) {
    this.values = values;
    this.distinct = distinct;
    this.state = new SourceState(pageSize);
    this.filterState = new SourceFilterState();
  }

  current(): any[] {
    if (this.values.length == 0) return [];
    let values = [...this.values];

    if (this.filterState.hasState()) {
      const fState = this.filterState.getState();

      values = filter(values, (val) => {
        let res: boolean = true;
        for (const key in fState) {
          switch (fState[key].type) {
            case SourceFilterType.contains: {
              res = String(val[fState[key].column.column]).toLowerCase().includes(String(fState[key].value).toLowerCase());
              break;
            }
            case SourceFilterType.equal: {
              res = String(val[fState[key].column.column]).toLowerCase() === String(fState[key].value).toLowerCase();
              break;
            }
            case SourceFilterType.in: {
              let arr = Array.isArray(fState[key].value) ? fState[key].value : [fState[key].value];
              res = arr.includes(String(val[fState[key].column.column]))
              break;
            }
          }
          if (!res) break;
        }
        return res;
      })
    }

    const state = this.state.getState();
    if (this.distinct) {
      values = unionBy(values, Object.keys(this.values[0])[0]);
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
