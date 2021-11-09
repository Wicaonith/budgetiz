import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { LabelComponent } from './pages/content/label/label.component';
import { SavingComponent } from './pages/content/saving/saving.component';
import { DataComponent } from './pages/content/data/data.component';
import { ImpotsComponent } from './pages/content/impots/impots.component';
import { PageNotFoundComponent } from './pages/page-not-found.component';
import { HomeComponent } from './pages/content/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'label', component: LabelComponent },
  { path: 'previsionnal', component: ImpotsComponent },
  { path: 'saving', component: SavingComponent },
  { path: 'data', component: DataComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
