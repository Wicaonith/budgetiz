import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { first, shareReplay } from 'rxjs/operators';
import firebase from 'firebase'
import 'firebase/auth';

@Injectable()
export class AuthService {

    public user$: Observable<firebase.User | null> = this.afAuth.user.pipe<firebase.User | null>(shareReplay(1));

    constructor(private afAuth: AngularFireAuth, private router: Router, private ngZone: NgZone) { }

    isLoggedIn(): any {
        return this.afAuth.authState.pipe(first()).toPromise();
    }

    /*signInWithGoogle() {
        return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
            .then((res) => {
                console.log('AuthService::Successful Google login', res);
                return this.ngZone.run(() => this.router.navigate(['/']));
            }).catch(err => {
                console.log('AuthService::Failed Google login', err);
            });
    }*/

    signInWithEmail(email: string, password: string) {
        return this.afAuth.signInWithEmailAndPassword(email, password).then(
            (res) => {
                console.log('AuthService::Successful Email login', res);
                if (res.user != null) {
                    localStorage.setItem('userUID', res.user.uid);
                }
                return this.ngZone.run(() => this.router.navigate(['/']));
            }
        );
    }

    signUpWithEmail(email: string, password: string) {
        return this.afAuth.createUserWithEmailAndPassword(email, password).then(
            () => {
                this.sendVerificationMail();
            }
        );
    }

    sendPasswordResetEmail(email: string) {
        return this.afAuth.sendPasswordResetEmail(email).then(
            () => {
                console.log("Email de reset de password envoyé");
            }
        );
    }

    logout() {
        this.afAuth.signOut().then(
            () => {
                localStorage.removeItem('userUID');
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(
                    () => {
                        this.router.navigate(['budgetiz/login']);
                    }
                );
            }
        );
    }


    sendVerificationMail() {
        return this.afAuth.currentUser.then(
            (u: firebase.User | null) => {
                if (u != null) {
                    u.sendEmailVerification();
                }
            }
        ).then(
            () => {
                this.router.navigate(['budgetiz/home']);
            }
        )
    }
}