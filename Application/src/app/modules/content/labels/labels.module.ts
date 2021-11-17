import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LabelsRoutingModule } from './labels-routing.module';

//Component
import { LabelsTabsComponent } from './components/tabs/labels-tabs.component';
import { LabelsSectionsComponent } from './components/labels-sections.component';
import { LabelsUndersectionsComponent } from './components/labels-undersections.component';
import { LabelsBankAccountComponent } from './components/labels-bankaccount.component';
import { FormSectionsComponent } from './components/forms/form-sections.component';
import { FormUndersectionsComponent } from './components/forms/form-undersections.component';
import { FormBankAccountComponent } from './components/forms/form-bankaccounts.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    LabelsTabsComponent,
    LabelsSectionsComponent,
    LabelsUndersectionsComponent,
    LabelsBankAccountComponent,
    FormSectionsComponent,
    FormUndersectionsComponent,
    FormBankAccountComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LabelsRoutingModule,
    MatTabsModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class LabelsModule { }
