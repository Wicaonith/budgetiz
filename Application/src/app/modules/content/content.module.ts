import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { LabelsModule } from './labels/labels.module';
import { TaxesModule } from './taxes/taxes.module';
import { SavingModule } from './saving/saving.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { TransactionsModule } from './transactions/transactions.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    // Modules des Pages
    LabelsModule,
    TaxesModule,
    SavingModule,
    HomeModule,
    LoginModule,
    TransactionsModule
  ]
})
export class ContentModule { }
