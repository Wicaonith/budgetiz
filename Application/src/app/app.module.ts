// Modules Core
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

// Module Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirebaseUIModule, firebase, firebaseui } from 'firebaseui-angular';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';

// Modules Budgetiz'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Services
import { UndercategoryService } from './shared/services/undercategories/undercategory.service';
import { AuthGuard } from './shared/services/authGuard/auth-guard.service';
import { AuthService } from './shared/services/authentication/auth.service';

// Component
import { PageNotFoundComponent } from './page-not-found.component';
import { HeaderComponent } from './modules/header/components/header.component';
import { FooterComponent } from './modules/footer/components/footer.component';
import { ContentComponent } from './modules/content/content.component';

import { environment } from 'src/environments/environment';
import { ContentModule } from './modules/content/content.module';
import { CategoryService } from './shared/services/categories/category.service';

import { MatSnackBarModule } from '@angular/material/snack-bar';


const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  tosUrl: '<your-tos-link>',
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ContentModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // for firestore
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
  ],
  providers: [
    CategoryService,
    UndercategoryService,
    AuthGuard,
    AuthService,
    AngularFireAuth,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
