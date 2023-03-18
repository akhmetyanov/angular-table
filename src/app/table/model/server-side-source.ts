import { Source } from './source';
import { SourceState } from './source-state';
import { cloneDeep, filter, orderBy, sortedUniqBy, unionBy, uniqBy, uniqWith } from 'lodash';
import { SourceFilterState, SourceFilterType } from './source-filter-state';

export class ServerSideSource implements Source {
  private values: any[];
  private select: any[];
  private state: SourceState;
  private distinct: boolean;

  filterState: SourceFilterState;

  constructor(values: any[], pageSize: number, distinct: boolean = false, select: string[] = []) {
    this.values = values;
    this.select = select;
    this.distinct = distinct;
    this.state = new SourceState(pageSize);
    this.filterState = new SourceFilterState();
  }

  all() {
    if (this.values.length == 0) return [];
    let values = [...this.values];

    if (this.filterState.hasState()) {
      const fState = this.filterState.getState();
      console.log('fState', fState)
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
              res = arr.length ? arr.includes(String(val[fState[key].column.column])) : true;
              break;
            }
          }
          if (!res) break;
        }
        return res;
      })
    }

    const state = this.state.getState();
    if (this.distinct && this.select.length) {
      values = uniqWith(values, (a, b) => {
        for (const field of this.select) {
          if (a[field] !== b[field]) return false;
        }
        return true;
      })
    }

    return values;
  }

  current(): any[] {
    if (this.values.length == 0) return [];
    let values = [...this.values];

    if (this.filterState.hasState()) {
      const fState = this.filterState.getState();
      console.log('fState', fState)
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
              res = arr.length ? arr.includes(String(val[fState[key].column.column])) : true;
              break;
            }
          }
          if (!res) break;
        }
        return res;
      })
    }

    const state = this.state.getState();
    if (this.distinct && this.select.length) {
      values = uniqWith(values, (a, b) => {
        for (const field of this.select) {
          if (a[field] !== b[field]) return false;
        }
        return true;
      })
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
