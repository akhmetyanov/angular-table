import { Column } from "./column"

export enum SourceFilterType {
    contains = 'contains',
    equal = 'eq'
}

export interface SourceFilterValue {
    column: Column
    value: any
    type: SourceFilterType
}

export class SourceFilterState {
    private state: Record<string, SourceFilterValue> = {};

    hasState() {
        return Object.keys(this.state).length > 0
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