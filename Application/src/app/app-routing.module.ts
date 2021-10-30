import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/content/home/home.component';
import { LabelComponent } from './pages/content/label/label.component';
import { SavingComponent } from './pages/content/saving/saving.component';
import { DataComponent } from './pages/content/data/data.component';
import { PrevisionalComponent } from './pages/content/previsional/previsional.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'label',
    component: LabelComponent
  },
  {
    path: 'previsionnal',
    component: PrevisionalComponent
  },
  {
    path: 'saving',
    component: SavingComponent
  },
  {
    path: 'data',
    component: DataComponent
  },
  {
    path: '**',
    redirectTo: '/',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
