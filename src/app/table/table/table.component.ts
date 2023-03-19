import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { cloneDeep } from 'lodash';
import { Column } from '../model/column';
import { Source } from '../model/source';
import { TableDataStoreService } from '../services/table-data-store.service';
import { TableFilterEventService } from '../services/table-filter-event.service';
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
  @Input() columns: Column[] = [];

  private source!: Source;
  id: number = -1;

  showDataShunk: any[] = [];

  constructor(
    private registerService: TableRegisterService,
    private sourceService: TableSourceService,
    private dataStoreService: TableDataStoreService,
    private filterEventService: TableFilterEventService
  ) { }

  ngOnInit(): void {
    this.id = this.registerService.registerTable();
    this.initSource();
    this.filterEventService.filterEvents$.subscribe(fEvents => {
      if (!Object.keys(fEvents).includes(String(this.id))) return;
      for (const column in fEvents[this.id]) {
        this.source.filterState.setFilter(
          fEvents[this.id][column].column,
          fEvents[this.id][column].value,
          fEvents[this.id][column].type
        )
      }
      this.showDataShunk = this.source.current();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['dataSource'].currentValue != changes['dataSource'].previousValue
    ) {
      this.initSource();
    }
  }

  @ViewChild(CdkVirtualScrollViewport)
  public viewPort!: CdkVirtualScrollViewport;


  public get inverseOfTranslation(): string {
    if (!this.viewPort || !this.viewPort["_renderedContentOffset"]) {
      return "-0px";
    }
    let offset = this.viewPort["_renderedContentOffset"];
    return `-${offset}px`;
  }

  private initSource() {
    this.dataSource.forEach((d, i) => d['_rowId'] = i)
    this.dataStoreService.add(this.id, this.dataSource);
    this.source = this.sourceService.buildTableSource(this.id, this.pageSize);
    this.showDataShunk = this.source.all();
  }

  trackByFn(index: number, item: any) {
    return item._rowId;
  }
}
