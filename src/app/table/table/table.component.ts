import { Component, OnInit } from '@angular/core';
import { TableRegisterService } from '../services/table-register.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  private id: number = -1;
  constructor(private registerService: TableRegisterService) {}

  ngOnInit(): void {
    this.id = this.registerService.registerTable();
    console.log(this.id);
  }
}
