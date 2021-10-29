import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PagesComponent } from './pages/pages.component'; // Main - 1st stage

import { HeaderComponent } from './pages/header/header.component'; // 2nd stage
import { FooterComponent } from './pages/footer/footer.component'; // 2nd stage
import { ContentComponent } from './pages/content/content.component'; // 2nd stage

import { HomeComponent } from './pages/content/home/home.component'; // 3rd stage

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
