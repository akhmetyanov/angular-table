import { SourceFilterState } from "./source-filter-state";

export interface Source {
  filterState: SourceFilterState
  current(): any[];
  next(): any[];
  previos(): any[];
}
