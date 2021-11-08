import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PagesComponent } from './pages/pages.component'; // Main - 1st stage

import { HeaderComponent } from './pages/header/header.component'; // 2nd stage
import { FooterComponent } from './pages/footer/footer.component'; // 2nd stage
import { ContentComponent } from './pages/content/content.component'; // 2nd stage

import { HomeComponent } from './pages/content/home/home.component'; // 3rd stage
import { DataComponent } from './pages/content/data/data.component'; // 3rd stage
import { PrevisionalComponent } from './pages/content/previsional/previsional.component'; // 3rd stage
import { SavingComponent } from './pages/content/saving/saving.component'; // 3rd stage
import { LabelComponent } from './pages/content/label/label.component'; // 3rd stage
import { SectionComponent } from './pages/content/label/section/section.component'; // 4th stage
import { UndersectionComponent } from './pages/content/label/undersection/undersection.component'; // 4th stage
import { BankaccountComponent } from './pages/content/label/bankaccount/bankaccount.component'; // 4th stage
import { PageNotFoundComponent } from './pages/page-not-found.component';

import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    HomeComponent,
    LabelComponent,
    DataComponent,
    PrevisionalComponent,
    SavingComponent,
    SectionComponent,
    UndersectionComponent,
    BankaccountComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule, 
    MatTabsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
