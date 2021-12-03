import { Component, Input, OnInit } from '@angular/core';
import { OverviewCategory } from 'src/app/shared/interfaces/overview.interface';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['../../../../../app.component.css']
})
export class CategoryTableComponent implements OnInit {

  @Input() categories: OverviewCategory[] = [];

  displayedColumns: string[] = [
    'expandIcon',
    'Relative ID',
    'Patient ID',
    'Is alive?',
    'Frequency of visits'
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
