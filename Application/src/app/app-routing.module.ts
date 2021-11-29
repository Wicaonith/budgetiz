import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/content/home/components/home.component';
import { LoginComponent } from './modules/content/login/components/login.component';
import { SavingComponent } from './modules/content/saving/components/saving.component';
import { TaxesComponent } from './modules/content/taxes/components/taxes.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { SingupComponent } from './modules/content/login/components/singup.component';
import { LabelsCategoriesComponent } from './modules/content/labels/components/categories/labels-categories.component';
import { LabelsBankAccountComponent } from './modules/content/labels/components/bankaccounts/labels-bankaccount.component';
import { LabelsUndercategoriesComponent } from './modules/content/labels/components/undercategories/labels-undercategories.component';
import { ResetPwdComponent } from './modules/content/login/components/reset-pwd.component';
import { TransactionsComponent } from './modules/content/transactions/components/transactions.component';
import { OverviewComponent } from './modules/content/overview/components/overview.component';

import { AuthGuard } from './shared/services/authGuard/auth-guard.service';
import { AuthService } from './shared/services/authentication/auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'budgetiz/home', pathMatch: 'full' },
  { path: 'budgetiz/login', component: LoginComponent },
  { path: 'budgetiz/signup', component: SingupComponent },
  { path: 'budgetiz/resetpassword', component: ResetPwdComponent },
  {
    path: 'budgetiz',
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'labels/category', component: LabelsCategoriesComponent },
      { path: 'labels/undercategory', component: LabelsUndercategoriesComponent },
      { path: 'labels/bankaccount', component: LabelsBankAccountComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'saving', component: SavingComponent },
      { path: 'overview', component: OverviewComponent },
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
