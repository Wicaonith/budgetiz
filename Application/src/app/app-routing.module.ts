import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { DatasComponent } from './modules/content/datas/components/datas.component';
import { HomeComponent } from './modules/content/home/components/home.component';
import { LabelsBankaccountComponent } from './modules/content/labels/components/labels-bankaccount.component';
import { LabelsSectionsComponent } from './modules/content/labels/components/labels-sections.component';
import { LabelsUndersectionsComponent } from './modules/content/labels/components/labels-undersections.component';
import { SavingComponent } from './modules/content/saving/components/saving.component';
import { TaxesComponent } from './modules/content/taxes/components/taxes.component';
import { PageNotFoundComponent } from './page-not-found.component';

import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'budgetiz/home', pathMatch: 'full' },
  {
    path: 'budgetiz',
    //canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'labels/section', component: LabelsSectionsComponent },
      { path: 'labels/undersection', component: LabelsUndersectionsComponent },
      { path: 'labels/bankaccount', component: LabelsBankaccountComponent },
      { path: 'datas', component: DatasComponent },
      { path: 'saving', component: SavingComponent },
      { path: 'taxes', component: TaxesComponent },
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class AppRoutingModule { }
