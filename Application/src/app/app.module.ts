import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PagesComponent } from './pages/pages.component'; // Main - 1st stage

import { HeaderComponent } from './pages/header/header.component'; // 2nd stage
import { FooterComponent } from './pages/footer/footer.component'; // 2nd stage

import { HomeComponent } from './pages/content/home/home.component'; // 3rd stage
import { DataComponent } from './pages/content/data/data.component'; // 3rd stage
import { ImpotsComponent } from './pages/content/impots/impots.component'; // 3rd stage
import { SavingComponent } from './pages/content/saving/saving.component'; // 3rd stage
import { LabelComponent } from './pages/content/label/label.component'; // 3rd stage
import { SectionComponent } from './pages/content/label/section/section.component'; // 4th stage
import { UndersectionComponent } from './pages/content/label/undersection/undersection.component'; // 4th stage
import { BankAccountComponent } from './pages/content/label/bankaccount/bankaccount.component'; // 4th stage
import { PageNotFoundComponent } from './pages/page-not-found.component';
import { SectionFormComponent } from './pages/content/label/section/section-form/section-form.component';

import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

//Services
import { SectionService } from './services/section.service';
import { UndersectionService } from './services/undersection.service';



@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LabelComponent,
    DataComponent,
    ImpotsComponent,
    SavingComponent,
    SectionComponent,
    UndersectionComponent,
    BankAccountComponent,
    PageNotFoundComponent,
    SectionFormComponent,
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
    AppRoutingModule,
    FormsModule
  ],
  providers: [SectionService,
    UndersectionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
