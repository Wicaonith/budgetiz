import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth-guard.service';

import { LabelsBankAccountComponent } from './components/labels-bankaccount.component';
import { LabelsSectionsComponent } from './components/labels-sections.component';
import { LabelsUndersectionsComponent } from './components/labels-undersections.component';

const routes: Routes = [
  {
    path: 'budgetiz',
    canActivate: [AuthGuard],
    children: [
      { path: 'labels/section', component: LabelsSectionsComponent },
      { path: 'labels/undersection', component: LabelsUndersectionsComponent },
      { path: 'labels/bankaccount', component: LabelsBankAccountComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabelsRoutingModule { }
