// Modules Core
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

// Module Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";

// Modules Budgetiz'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaxesModule } from './modules/content/taxes/taxes.module';
import { SavingModule } from './modules/content/saving/saving.module';
import { LabelsModule } from './modules/content/labels/labels.module';
import { HomeModule } from './modules/content/home/home.module';
import { DatasModule } from './modules/content/datas/datas.module';
import { LoginModule } from './modules/content/login/login.module';

//Services
import { SectionService } from './services/section.service';
import { UndersectionService } from './services/undersection.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';

// Component
import { PageNotFoundComponent } from './page-not-found.component';
import { HeaderComponent } from './modules/header/components/header.component';
import { FooterComponent } from './modules/footer/components/footer.component';
import { ContentComponent } from './modules/content/content.component';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    TaxesModule,
    SavingModule,
    LabelsModule,
    HomeModule,
    DatasModule,
    LoginModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // for firestore
    AngularFireAuthModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
  ],
  providers: [SectionService,
    UndersectionService,
    AuthGuard,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
