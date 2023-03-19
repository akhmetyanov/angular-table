import { SourceFilterState } from "./source-filter-state";
import { SourceSortState } from "./source-sort-state";

export interface Source {
  filterState: SourceFilterState
  sortState: SourceSortState
  current(): any[];
  next(): any[];
  previos(): any[];
  all(): any[];
}
