export enum SortDirections {
    asc = 'asc',
    desc = 'desc'
}

export class SourceSortState {
    state: Record<string, SortDirections> = {};

    hasState() {
        return Object.keys(this.state).length > 0
    }

    setState(state: Record<string, SortDirections>) {
        this.state = {};
        for (const column of Object.keys(state)) {
            this.state[column] = state[column]
        }
    }
}