import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OverviewComponent } from './components/overview.component';
import { FamilyTableComponent } from './components/table/family-table.component';
import { CategoryTableComponent } from './components/table/category-table.component';
import { UndercategoryTableComponent } from './components/table/undercategory-table.component';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    OverviewComponent,
    FamilyTableComponent,
    CategoryTableComponent,
    UndercategoryTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
  ]
})
export class OverviewModule { }
