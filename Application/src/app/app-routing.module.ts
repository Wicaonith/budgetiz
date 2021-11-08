import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { LabelComponent } from './pages/content/label/label.component';
import { SavingComponent } from './pages/content/saving/saving.component';
import { DataComponent } from './pages/content/data/data.component';
import { PrevisionalComponent } from './pages/content/previsional/previsional.component';
import { PageNotFoundComponent } from './pages/page-not-found.component';
import { ContentComponent } from './pages/content/content.component';

const routes: Routes = [
  { path: '', component: ContentComponent },
  { path: 'label', component: LabelComponent },
  { path: 'previsionnal', component: PrevisionalComponent },
  { path: 'saving', component: SavingComponent },
  { path: 'data', component: DataComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
