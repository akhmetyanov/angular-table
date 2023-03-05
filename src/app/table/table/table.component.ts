import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Source } from '../model/source';
import { TableDataStoreService } from '../services/table-data-store.service';
import { TableRegisterService } from '../services/table-register.service';
import { TableSourceService } from '../services/table-source.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnChanges {
  @Input() pageSize: number = 500;
  @Input() dataSource: any[] = [];
  @Input() columnNames: any = {};

  private source!: Source;
  private id: number = -1;

  columns: string[] = [];
  showDataShunk: any[] = [];

  constructor(
    private registerService: TableRegisterService,
    private sourceService: TableSourceService,
    private dataStoreService: TableDataStoreService
  ) {}

  ngOnInit(): void {
    this.id = this.registerService.registerTable();
    this.initSource();
    this.initColumnNames();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['dataSource'].currentValue != changes['dataSource'].previousValue
    ) {
      this.initSource();
    }
  }

  private initColumnNames() {
    this.columns = Object.keys(this.columnNames).map(
      (key: string) => this.columnNames[key]
    );
  }

  private initSource() {
    this.dataStoreService.add(this.id, this.dataSource);
    this.source = this.sourceService.buildTableSource(this.id, this.pageSize);
    this.showDataShunk = this.source.current();
    console.log(this.showDataShunk);
  }
}
