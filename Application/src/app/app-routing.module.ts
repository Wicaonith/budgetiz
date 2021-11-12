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

import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'budgetiz',
    canActivate: [AuthGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'home', component: HomeComponent },
      {
        path: 'label',
        component: LabelComponent,
        children: [
          { path: 'section', component: SectionComponent },
          { path: 'undersection', component: UndersectionComponent },
          { path: 'account', component: BankAccountComponent },
        ]
      },
      { path: 'impots', component: ImpotsComponent },
      { path: 'saving', component: SavingComponent },
      { path: 'data', component: DataComponent },
      { path: '**', component: PageNotFoundComponent }
    ]
  }
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
