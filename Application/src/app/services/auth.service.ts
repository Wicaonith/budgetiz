import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable()
export class AuthService {

    userData: any; // Save logged in user data

    constructor(private afAuth: AngularFireAuth, private router: Router) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                console.log("Login" + user);
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
            } else {
                console.log("Logout" + user);
                localStorage.setItem('user', "");
            }
        })
    }

    login(email: string, password: string) {
        this.afAuth.signInWithEmailAndPassword(email, password)
            .then(value => {
                console.log('Nice, it worked!');
                this.router.navigateByUrl('/budgetiz/home');
            })
            .catch(err => {
                console.log('Something went wrong: ', err.message);
            });
    }

    emailSignup(email: string, password: string) {
        this.afAuth.createUserWithEmailAndPassword(email, password)
            .then(value => {
                console.log('Sucess', value);
                this.router.navigateByUrl('/budgetiz/home');
            })
            .catch(error => {
                console.log('Something went wrong: ', error);
            });
    }

    /*  googleLogin() {
          const provider = new firebase.GoogleAuthProvider();
          return this.oAuthLogin(provider)
              .then(value => {
                  console.log('Sucess', value),
                      this.router.navigateByUrl('/profile');
              })
              .catch(error => {
                  console.log('Something went wrong: ', error);
              });
      }
  */
    logout() {
        this.afAuth.signOut().then(() => {
            this.router.navigate(['/']);
        });
    }

    /*private oAuthLogin(provider: firebase.default.auth.AuthProvider) {
        return this.afAuth.signInWithPopup(provider);
    }*/
}