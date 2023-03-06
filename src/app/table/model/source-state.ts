export class SourceState {
  top: number;
  skip: number;

  constructor(pageSize: number) {
    this.top = pageSize;
    this.skip = 0;
  }
  
  getState() {
    return { from: this.skip, to: this.skip + this.top };
  }

  setNextPageState() {
    this.skip += this.top;
  }

  setPreviosPageState() {
    this.skip -= this.top;
  }
}
