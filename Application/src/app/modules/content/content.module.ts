import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/components/home.component';
import { SavingComponent } from './saving/components/saving.component';
import { LabelsBankaccountComponent } from './labels/components/labels-bankaccount.component';
import { LabelsSectionsComponent } from './labels/components/labels-sections.component';
import { LabelsUndersectionsComponent } from './labels/components/labels-undersections.component';
import { DatasComponent } from './datas/components/datas.component';
import { TaxesComponent } from './taxes/components/taxes.component';


@NgModule({
  declarations: [
    HomeComponent,
    SavingComponent,
    LabelsBankaccountComponent,
    LabelsSectionsComponent,
    LabelsUndersectionsComponent,
    DatasComponent,
    TaxesComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class ContentModule { }
