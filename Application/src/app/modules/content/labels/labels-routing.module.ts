import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/authGuard/auth-guard.service';
import { LabelsBankAccountComponent } from './components/bankaccounts/labels-bankaccount.component';
import { LabelsCategoriesComponent } from './components/categories/labels-categories.component';
import { LabelsUndercategoriesComponent } from './components/undercategories/labels-undercategories.component';


const routes: Routes = [
  {
    path: 'budgetiz',
    canActivate: [AuthGuard],
    children: [
      { path: 'labels/category', component: LabelsCategoriesComponent },
      { path: 'labels/undercategory', component: LabelsUndercategoriesComponent },
      { path: 'labels/bankaccount', component: LabelsBankAccountComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabelsRoutingModule { }
