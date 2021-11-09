import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { LabelComponent } from './pages/content/label/label.component';
import { SavingComponent } from './pages/content/saving/saving.component';
import { DataComponent } from './pages/content/data/data.component';
import { ImpotsComponent } from './pages/content/impots/impots.component';
import { PageNotFoundComponent } from './pages/page-not-found.component';
import { HomeComponent } from './pages/content/home/home.component';
import { SectionComponent } from './pages/content/label/section/section.component';
import { UndersectionComponent } from './pages/content/label/undersection/undersection.component';
import { BankAccountComponent } from './pages/content/label/bankaccount/bankaccount.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'label', 
  component: LabelComponent,
  children: [
    { path: 'section', component: SectionComponent },
    { path: 'undersection', component: UndersectionComponent },
    { path: 'account', component: BankAccountComponent },
  ]},
  { path: 'impots', component: ImpotsComponent },
  { path: 'saving', component: SavingComponent },
  { path: 'data', component: DataComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
