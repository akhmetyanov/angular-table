import { Source } from './source';
import { SourceState } from './source-state';

export class ServerSideSource implements Source {
  private values: any[];
  private state: SourceState;

  constructor(values: any[], pageSize: number) {
    this.values = values;
    this.state = new SourceState(pageSize);
  }

  current(): any[] {
    const state = this.state.getState();
    return this.values.slice(state.from, state.to);
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
