import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Family, OverviewCategory, OverviewUndercategory } from 'src/app/shared/interfaces/overview.interface';

@Component({
  selector: 'app-family-table',
  templateUrl: './family-table.component.html',
  styleUrls: ['../../../../../app.component.css']
})
export class FamilyTableComponent implements OnInit {

  @Input() dataSource: Family[] | OverviewCategory[] | OverviewUndercategory[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() referenceId: string = "";
  @Input() iconKeyReference: string = "";
  @Input() renderTemplate: string = "";

  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();

  expandedId: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  toggleExpandableSymbol(id: string): void {
    this.expandedId = this.expandedId === id ? '' : id;
  }
}
