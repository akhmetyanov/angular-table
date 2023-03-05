import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Column } from 'src/app/table/model/column';

export interface TestData {
  country: string;
  year: number;
  population: number;
  cement_co2: number;
  cement_co2_per_capita: number;
  co2: number;
  co2_growth_abs: number;
  co2_growth_prct: number;
  co2_including_luc: number;
  co2_including_luc_growth_abs: number;
  co2_including_luc_growth_prct: number;
  co2_including_luc_per_capita: number;
  co2_per_capita: number;
  coal_co2: number;
  coal_co2_per_capita: number;
  cumulative_cement_co2: number;
  cumulative_co2: number;
  cumulative_co2_including_luc: number;
  cumulative_coal_co2: number;
  cumulative_flaring_co2: number;
  cumulative_gas_co2: number;
  cumulative_luc_co2: number;
  cumulative_oil_co2: number;
  flaring_co2: number;
  flaring_co2_per_capita: number;
  gas_co2: number;
  gas_co2_per_capita: number;
  land_use_change_co2: number;
  land_use_change_co2_per_capita: number;
  oil_co2: number;
  oil_co2_per_capita: number;
  share_global_cement_co2: number;
  share_global_co2: number;
  share_global_co2_including_luc: number;
  share_global_coal_co2: number;
  share_global_cumulative_cement_co2: number;
  share_global_cumulative_co2: number;
  share_global_cumulative_co2_including_luc: number;
  share_global_cumulative_coal_co2: number;
  share_global_cumulative_flaring_co2: number;
  share_global_cumulative_gas_co2: number;
  share_global_cumulative_luc_co2: number;
  share_global_cumulative_oil_co2: number;
  share_global_flaring_co2: number;
  share_global_gas_co2: number;
  share_global_luc_co2: number;
  share_global_oil_co2: number;
}

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css'],
})
export class TestPageComponent implements OnInit {
  data: TestData[] = [];
  columnNames: any = {
    country: 'country',
    year: 'year',
    population: 'population',
    cement_co2: 'cement_co2',
    cement_co2_per_capita: 'cement_co2_per_capita',
    co2: 'co2',
    co2_growth_abs: 'co2_growth_abs',
    co2_growth_prct: 'co2_growth_prct',
    co2_including_luc: 'co2_including_luc',
    co2_including_luc_growth_abs: 'co2_including_luc_growth_abs',
    co2_including_luc_growth_prct: 'co2_including_luc_growth_prct',
    co2_including_luc_per_capita: 'co2_including_luc_per_capita',
    co2_per_capita: 'co2_per_capita',
    coal_co2: 'coal_co2',
    coal_co2_per_capita: 'coal_co2_per_capita',
    cumulative_cement_co2: 'cumulative_cement_co2',
    cumulative_co2: 'cumulative_co2',
    cumulative_co2_including_luc: 'cumulative_co2_including_luc',
    cumulative_coal_co2: 'cumulative_coal_co2',
    cumulative_flaring_co2: 'cumulative_flaring_co2',
    cumulative_gas_co2: 'cumulative_gas_co2',
    cumulative_luc_co2: 'cumulative_luc_co2',
    cumulative_oil_co2: 'cumulative_oil_co2',
    flaring_co2: 'flaring_co2',
    flaring_co2_per_capita: 'flaring_co2_per_capita',
    gas_co2: 'gas_co2',
    gas_co2_per_capita: 'gas_co2_per_capita',
    land_use_change_co2: 'land_use_change_co2',
    land_use_change_co2_per_capita: 'land_use_change_co2_per_capita',
    oil_co2: 'oil_co2',
    oil_co2_per_capita: 'oil_co2_per_capita',
    share_global_cement_co2: 'share_global_cement_co2',
    share_global_co2: 'share_global_co2',
    share_global_co2_including_luc: 'share_global_co2_including_luc',
    share_global_coal_co2: 'share_global_coal_co2',
    share_global_cumulative_cement_co2: 'share_global_cumulative_cement_co2',
    share_global_cumulative_co2: 'share_global_cumulative_co2',
    share_global_cumulative_co2_including_luc:
      'share_global_cumulative_co2_including_luc',
    share_global_cumulative_coal_co2: 'share_global_cumulative_coal_co2',
    share_global_cumulative_flaring_co2: 'share_global_cumulative_flaring_co2',
    share_global_cumulative_gas_co2: 'share_global_cumulative_gas_co2',
    share_global_cumulative_luc_co2: 'share_global_cumulative_luc_co2',
    share_global_cumulative_oil_co2: 'share_global_cumulative_oil_co2',
    share_global_flaring_co2: 'share_global_flaring_co2',
    share_global_gas_co2: 'share_global_gas_co2',
    share_global_luc_co2: 'share_global_luc_co2',
    share_global_oil_co2: 'share_global_oil_co2',
  };
  columns: Column[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('/assets/owid-co2-data.json').subscribe((data: any) => {
      let testData: TestData[] = [];
      Object.keys(data).map((country: string) => {
        for (const row of data[country]['data'] as TestData[]) {
          row.country = country;
          testData.push(row);
        }
      });
      this.data = testData;
    });

    this.columns = Object.keys(this.columnNames).map(
      (key: string) => new Column(key, this.columnNames[key])
    );
  }
}
