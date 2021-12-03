import { Component, Input, OnInit } from '@angular/core';
import { OverviewUndercategory } from 'src/app/shared/interfaces/overview.interface';

@Component({
  selector: 'app-undercategory-table',
  templateUrl: './undercategory-table.component.html',
  styleUrls: ['../../../../../app.component.css']
})
export class UndercategoryTableComponent implements OnInit {

  @Input() undercategories: OverviewUndercategory[] = [];

  displayedColumns: string[] = [
    'Phone ID',
    'ID of the relative',
    'Phone'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
