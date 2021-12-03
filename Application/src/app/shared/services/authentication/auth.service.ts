import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { first, shareReplay } from 'rxjs/operators';
import firebase from 'firebase'
import 'firebase/auth';
import {UtilsService} from '../utils/utils.service';

@Injectable()
/**
 * Class Service de gestion de l'Authentification
 */
export class AuthService {

  /**
   * TODO SUPPR ?
   *
   * @type {<firebase.User | null>}
   */
  public user$: Observable<firebase.User | null> = this.afAuth.user.pipe<firebase.User | null>(shareReplay(1));

  /**
   * Constructeur de la class Service AuthService
   *
   * @param {AngularFireAuth} afAuth - Classe des services FireAuth
   * @param {UtilsService} utilsService - Classe Service UtilsService
   * @param {Router} router - Classe gérant le routing
   * @param {NgZone} ngZone - Classe
   */
  constructor(
    private afAuth: AngularFireAuth,
    private utilsService: UtilsService,
    private router: Router,
    private ngZone: NgZone) {}

  /**
   * Méthode permettant de savoir si un utilisateur est authentifié
   * Retourne true si un utilisateur est authentifié
   * Retourne false si aucun utilisateur n'est authentifié
   *
   * @returns {any} - true si un utilisateur est authentifié
   */
  isLoggedIn(): any {
      return this.afAuth.authState.pipe(first()).toPromise();
  }

  /**
   * Méthode permettant de s'authentifié via Email et Mot de passe
   *
   * @param {string} email - Email de l'utilisateur
   * @param {string} password - Mot de passe de l'utilisateur
   */
  signInWithEmail(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        // Lorsque l'authentification s'est bien passé
        if (res.user != null) {
          // Sauvegarde de l'identifiant FireAuth de l'utilisateur dans le localStorage
          localStorage.setItem('userUID', res.user.uid);
        }
        // Redirection vers la page d'accueil
        return this.ngZone.run(() => this.router.navigate(['/']));
      }
    );
  }

  /**
   * Méthode permettrant de s'enregistrer (créer un compte) via Email et Mot de passe
   *
   * @param {string} email - Email de l'utilisateur
   * @param {string} password - Mot de passe de l'utilisateur
   */
  signUpWithEmail(email: string, password: string) {
      return this.afAuth.createUserWithEmailAndPassword(email, password).then(
          () => { // Cas de réussite
            // Envoi du mail de vérification
            this.sendVerificationMail();
          },
          () => { // Cas d'erreur

          }
      );
  }

  /**
   * Méthode permettant l'envoi d'un mail pour réinitialiser le mot de passe
   *
   * @param {string} email - Email de l'utilisateur
   */
  sendPasswordResetEmail(email: string) {
      return this.afAuth.sendPasswordResetEmail(email).then(
          () => { // Cas de réussite
              console.log("Email de reset de password envoyé");
          },
          () => { // Cas d'erreur

          }
      );
  }

  /**
   * Méthode permettant a l'utilisateur de se déconnecter
   */
  logout() {
    this.afAuth.signOut().then(
      () => { // Cas de réussite
        // Suppression de l'identifiant FireAuth de l'utilisateur dans le localStorage
        localStorage.removeItem('userUID');
        // Redirection vers la page de login
        this.utilsService.redirectTo('budgetiz/login');
      },
      () => { // Cas d'erreur

      }
    );
  }

  /**
   * Envoie un mail de vérification suite a l'enregistrement d'un nouveau compte
   */
  sendVerificationMail() {
    // On vérifie qu'il existe un compte utilisateur
    return this.afAuth.currentUser.then(
      (u: firebase.User | null) => { // Cas de réussite
        // Si il existe un compte utilisateur
        if (u != null) {
          // On envoie un email de vérification
          u.sendEmailVerification();
        }
        this.utilsService.redirectTo('budgetiz/home');
      },
      () => { // Cas d'erreur

      }
    )
  }

  /*
  signInWithGoogle() {
      return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
          .then((res) => {
              console.log('AuthService::Successful Google login', res);
              return this.ngZone.run(() => this.router.navigate(['/']));
          }).catch(err => {
              console.log('AuthService::Failed Google login', err);
          });
  }
  */
}
