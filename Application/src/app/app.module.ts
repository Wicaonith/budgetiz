import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PagesComponent } from './pages/pages.component'; // Main - 1st stage

import { HeaderComponent } from './pages/header/header.component'; // 2nd stage
import { FooterComponent } from './pages/footer/footer.component'; // 2nd stage
import { ContentComponent } from './pages/content/content.component'; // 2nd stage

import { HomeComponent } from './pages/content/home/home.component'; // 3rd stage
import { LabelComponent } from './pages/content/label/label.component'; // 3rd stage
import { DataComponent } from './pages/content/data/data.component'; // 3rd stage
import { PrevisionalComponent } from './pages/content/previsional/previsional.component'; // 3rd stage
import { SavingComponent } from './pages/content/saving/saving.component'; // 3rd stage

import { RouterModule } from '@angular/router';

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
    SavingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
