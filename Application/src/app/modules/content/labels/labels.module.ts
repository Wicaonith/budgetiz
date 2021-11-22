import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelsRoutingModule } from './labels-routing.module';
import { FormsModule } from '@angular/forms';

//Component
import { LabelsSectionsComponent } from './components/sections/labels-sections.component';
import { LabelsUndersectionsComponent } from './components/undersections/labels-undersections.component';
import { LabelsBankAccountComponent } from './components/bankaccounts/labels-bankaccount.component';
import { LabelsTabsComponent } from './components/labels-tabs.component';
import { FormSectionsComponent } from './components/sections/form-sections.component';
import { FormUndersectionsComponent } from './components/undersections/form-undersections.component';
import { FormBankAccountComponent } from './components/bankaccounts/form-bankaccounts.component';

// Material Module
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    LabelsSectionsComponent,
    LabelsUndersectionsComponent,
    LabelsBankAccountComponent,
    LabelsTabsComponent,
    FormSectionsComponent,
    FormUndersectionsComponent,
    FormBankAccountComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LabelsRoutingModule,
    // Modules de Material
    MatTabsModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule
  ]
})
export class LabelsModule { }
