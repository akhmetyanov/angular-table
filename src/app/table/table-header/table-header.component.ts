import { Component, Input, OnInit } from '@angular/core';
import { Column } from '../model/column';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.css'],
})
export class TableHeaderComponent implements OnInit {
  @Input() value!: Column;
  @Input() tableIndex!: number;

  filterPanelVisibility: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onFilterClick() {
    this.filterPanelVisibility = !this.filterPanelVisibility;
  }

  onSortClick() {}
}
