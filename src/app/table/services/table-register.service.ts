import { Injectable } from '@angular/core';

@Injectable()
export class TableRegisterService {
  private tables: number = 0;

  constructor() {}

  registerTable(): number {
    return ++this.tables;
  }
}
