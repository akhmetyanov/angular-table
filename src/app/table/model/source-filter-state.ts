import { trigger } from "@angular/animations";
import { Column } from "./column"

export enum SourceFilterType {
    contains = 'contains',
    equal = 'eq',
    in = 'in'
}

export interface SourceFilterValue {
    column: Column
    value: any
    type: SourceFilterType
}

export class SourceFilterState {
    private state: Record<string, SourceFilterValue> = {};

    hasState() {
        let hasState: boolean = false;
        for (const column of Object.keys(this.state)) {
            if (this.state[column].value.length) hasState = true;
        }
        return hasState
    }

    setFilter(column: Column, value: any, type: SourceFilterType) {
        this.state[column.column] = { column: column, type: type, value: value }
    }

    clearState() {
        this.state = {};
    }

    getState() {
        return this.state;
    }
}