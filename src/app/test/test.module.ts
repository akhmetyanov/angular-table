import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestPageComponent } from './test-page/test-page.component';
import { TableModule } from '../table/table.module';

@NgModule({
  declarations: [TestPageComponent],
  imports: [CommonModule, TableModule],
  exports: [TestPageComponent],
})
export class TestModule {}
